import { h } from 'preact';

import config from '@authenticator/config';
import { Input } from '@authenticator/form';
import { NullAppError } from '@authenticator/errors';

interface Props {
  onChange: { (evt: Event, error: NullAppError): void };
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
    class='signup-input'
    label='Password'
    type='password'
    onChange={props.onChange}
    validator={validatePassword}
    id='signup-password' />
);

export default InputPassword;
