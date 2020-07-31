import { h } from 'preact';

import config from '@authenticator/config';
import { Input } from '@authenticator/form';
import { NullAppError } from '@authenticator/errors';

interface Props {
  onChange: { (evt: Event, err: NullAppError ): void };
  onInput: { (password: string): void };
  class?: string;
  label?: string;
  placeholder?: string;
  value: string;
  validator?: { (v: string | number): NullAppError };
  error: NullAppError;
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

const handleInput = (evt: Event, onInput: {(password: string): void}): void => {
  const { value } = (evt.currentTarget as HTMLFormElement);
  onInput(value);
};

const InputPassword = (props: Props): JSX.Element => (
  <Input
    class={props.class}
    label={props.label}
    value={props.value}
    error={props.error}
    placeholder={props.placeholder}
    type='password'
    onChange={props.onChange}
    onInput={(evt: Event) => handleInput(evt, props.onInput)}
    validator={props.validator || validatePassword}
    id={props.id} />
);

export default InputPassword;
