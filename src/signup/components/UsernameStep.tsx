import { h } from 'preact';
import { InputContact, Button } from '@authenticator/form';
import { NullAppError } from '@authenticator/errors';
import { ContactMethod } from '@authenticator/identity/contact';

interface Props {
  onSubmit: { (): void };
  onChange: { (address: string, method: ContactMethod, error: NullAppError): void };
  isDisabled: boolean;
  error: NullAppError;
}

const UsernameStep = (props: Props): JSX.Element => (
  <div class='signup-form__username'>
    <InputContact
      onChange={props.onChange}
      language={window.navigator.language || ''}
      class='signup-input'
      placeholder='Email address or mobile number'
      id='signup-username' />
    <Button
      name='Next'
      class='signup-btn'
      hasError={Boolean(props.error)}
      isDisabled={props.isDisabled}
      onClick={props.onSubmit} />
  </div>
);

export default UsernameStep;
