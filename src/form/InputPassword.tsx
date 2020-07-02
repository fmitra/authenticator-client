import { h } from 'preact';

import config from '@authenticator/config';
import { Input } from '@authenticator/form';
import { NullAppError } from '@authenticator/errors';

interface Props {
  onChange: { (evt: Event, error: NullAppError): void };
  class: string;
  label: string;
  id: string;
}

const validatePassword = (inputValue: string | number): NullAppError => {
  if (String(inputValue).length >= config.password.minLength) {
    return null;
  }

  return {
    message: `Password should be at least ${config.password.minLength} characters long`,
    code: 'invalid_password'
  };
};

const InputPassword = (props: Props): JSX.Element => (
  <Input
    class={props.class}
    label={props.label}
    type='password'
    onChange={props.onChange}
    validator={validatePassword}
    id={props.id} />
);

export default InputPassword;
