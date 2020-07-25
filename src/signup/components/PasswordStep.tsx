import { h } from 'preact';

import { NullAppError } from '@authenticator/errors';
import { InputNewPassword, Button } from '@authenticator/form';

interface Props {
  onSubmit: { (): void }
  goBack: { (): void }
  onChange: { (password: string, error: NullAppError): void }
  isDisabled: boolean;
  error: NullAppError;
}

const PasswordStep = (props: Props): JSX.Element => (
  <div class='signup-form__passwords'>
    <InputNewPassword
      onChange={props.onChange}
      class='signup-form__passwords-input'
      id='signup-form-passwords' />
    <div class='signup-form__passwords-btns'>
      <Button
        name='Previous'
        class='signup-form__passwords-btns-secondary'
        hasError={false}
        isDisabled={false}
        onClick={props.goBack} />
      <Button
        name='Sign up'
        class='signup-form__passwords-btns-primary'
        hasError={Boolean(props.error)}
        isDisabled={props.isDisabled}
        onClick={props.onSubmit} />
    </div>
  </div>
);

export default PasswordStep;
