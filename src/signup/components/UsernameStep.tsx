import { h } from 'preact';
import { InputContact, Button } from '@authenticator/form';
import { NullAppError } from '@authenticator/errors';
import { ContactMethod } from '@authenticator/identity/contact';

interface Props {
  onSubmit: { (): void };
  onInput: { (address: string, method: ContactMethod): void };
  onChange: { (e: Event, error: NullAppError): void };
  isDisabled: boolean;
  value: string;
  hasError: boolean;
  error: NullAppError;
}

const UsernameStep = (props: Props): JSX.Element => (
  <div class='signup-username'>
    <InputContact
      onInput={props.onInput}
      onChange={props.onChange}
      language={window.navigator.language || ''}
      value={props.value}
      error={props.error}
      id='signup-username' />
    <Button
      name='Next'
      class='button--wide'
      hasError={props.hasError}
      isDisabled={props.isDisabled}
      onClick={props.onSubmit} />
  </div>
);

export default UsernameStep;
