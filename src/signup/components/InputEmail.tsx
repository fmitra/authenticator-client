import { h } from 'preact';

import { Input } from '@authenticator/form';
import { isMaybeEmail } from '@authenticator/identity/validators';
import { NullAppError } from '@authenticator/errors';

interface Props {
  onChange: { (evt: Event, error: NullAppError ): void };
}

const validateEmail = (inputValue: string | number): NullAppError => {
  if (isMaybeEmail(String(inputValue))) {
    return null;
  }

  return {
    message: 'Please enter a valid email address',
    code: 'invalid_email',
  };
};

const InputEmail = (props: Props): JSX.Element => (
  <Input
    class='signup-input'
    label='Username'
    type='email'
    id='signup-username-email'
    onChange={props.onChange}
    validator={validateEmail} />
);

export default InputEmail;
