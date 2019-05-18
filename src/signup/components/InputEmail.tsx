import { h } from 'preact';

import { Input } from '@authenticator/form';
import { isMaybeEmail } from '@authenticator/identity/validators';

interface Props {
  onChange: { (e: Event): void };
}

const validateEmail = (inputValue: string | number): string => {
  if (isMaybeEmail(String(inputValue))) {
    return '';
  }

  return 'Please enter a valid email address';
};

const InputEmail = (props: Props): JSX.Element => (
  <Input
    class='signup-input'
    label='Username'
    type='text'
    id='signup-username-email'
    onChange={props.onChange}
    validator={validateEmail} />
);

export default InputEmail;
