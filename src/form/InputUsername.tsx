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
  onChange: { (username: string, method: ContactMethod, error: NullAppError): void };
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

const validatePhone = (input: string): NullAppError => {
  if (isMaybePhone(input)) {
    return null;
  }

  return {
    message: 'Please enter a valid phone',
    code: 'invalid_phone',
  };
};

const validateUserName = (input: string | number): NullAppError => {
  const contactMethod = inferContactMethod(String(input));

  if (contactMethod == PHONE) {
    return validatePhone(String(input));
  }

  return validateEmail(String(input));
};

export default class InputUsername extends Component<Props, {}> {
  handleUsername = (e: Event, error: NullAppError): void => {
    const { language, onChange } = this.props;
    const { value } = (e.currentTarget as HTMLFormElement);
    const contactMethod = inferContactMethod(value);

    if (error) {
      onChange(value, contactMethod, error);
      return;
    }

    let username = value.trim();

    if (contactMethod === PHONE) {
      username = phoneWithRegion(username, language);
    }

    onChange(username, contactMethod, error);
  }

  render(): JSX.Element {
    return (
      <Input
        class={this.props.class}
        label={this.props.label}
        type='text'
        id={this.props.id}
        onChange={this.handleUsername}
        validator={validateUserName} />
    );
  }
};
