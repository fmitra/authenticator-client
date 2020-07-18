import { h, Component } from 'preact';

import { Input } from '@authenticator/form';
import {
  inferContactMethod,
  phoneWithRegion,
  ContactMethod,
  PHONE,
} from '@authenticator/identity/contact';
import { isMaybeEmail, isMaybePhone } from '@authenticator/identity/validators';
import { NullAppError } from '@authenticator/errors';

interface Props {
  class: string;
  id: string;
  label: string;
  language: string;
  onChange: { (address: string, method: ContactMethod, error: NullAppError): void };
}

const validateEmail = (input: string): NullAppError => {
  if (isMaybeEmail(input)) {
    return null;
  }

  return {
    message: 'Please enter a valid email address',
    code: 'invalid_email',
  };
};

const validatePhone = (input: string, language: string): NullAppError => {
  if (!isMaybePhone(input)) {
    return {
      message: 'Please enter a valid phone',
      code: 'invalid_phone',
    };
  }

  const phone = phoneWithRegion(input, language);
  if (!phone.startsWith('+')) {
    return {
      message: 'Please include your country code with your phone number',
      code: 'invalid_phone',
    };
  }

  return null;
};

const validateContact = (language: string): { (input: string | number): NullAppError } => {
  return (input: string | number): NullAppError => {
    const contactMethod = inferContactMethod(String(input));

    if (contactMethod == PHONE) {
      return validatePhone(String(input), language);
    }

    return validateEmail(String(input));
  }
};

export default class InputContact extends Component<Props, {}> {
  handleContact = (e: Event, error: NullAppError): void => {
    const { language, onChange } = this.props;
    const { value } = (e.currentTarget as HTMLFormElement);
    const contactMethod = inferContactMethod(value);

    if (error) {
      onChange(value, contactMethod, error);
      return;
    }

    let contact = value.trim();

    if (contactMethod === PHONE) {
      contact = phoneWithRegion(contact, language);
    }

    onChange(contact, contactMethod, error);
  }

  render(): JSX.Element {
    return (
      <Input
        class={this.props.class}
        label={this.props.label}
        type='text'
        id={this.props.id}
        onChange={this.handleContact}
        validator={validateContact(this.props.language)} />
    );
  }
};
