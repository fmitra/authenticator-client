import { h } from 'preact';

import { Input } from '@authenticator/form';
import { isMaybePhone } from '@authenticator/identity/validators';

interface Props {
  onChange: { (e: Event): void };
}

const validatePhone = (inputValue: string | number): string => {
  if (isMaybePhone(String(inputValue))) {
    return '';
  }

  return 'Please enter a valid phone';
};

const InputPhone = (props: Props): JSX.Element => (
  <Input
    class='signup-input'
    label='Username'
    type='text'
    id='signup-username-phone'
    onChange={props.onChange}
    validator={validatePhone} />
);

export default InputPhone;
