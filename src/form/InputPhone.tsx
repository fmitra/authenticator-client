import { h } from 'preact';

import { Input } from '@authenticator/form';
import { isMaybePhone } from '@authenticator/identity/validators';
import { NullAppError } from '@authenticator/errors';

interface Props {
  onChange: { (evt: Event, error: NullAppError ): void };
  id: string;
  label: string;
  class: string;
}

const validatePhone = (inputValue: string | number): NullAppError => {
  if (isMaybePhone(String(inputValue))) {
    return null;
  }

  return {
    message: 'Please enter a valid phone',
    code: 'invalid_phone',
  };
};

const InputPhone = (props: Props): JSX.Element => (
  <Input
    class={props.class}
    label={props.label}
    type='text'
    id={props.id}
    onChange={props.onChange}
    validator={validatePhone} />
);

export default InputPhone;
