import { h } from 'preact';

import { NullAppError } from '@authenticator/errors';
import { InputNewPassword, Button } from '@authenticator/form';

interface Props {
  onSubmit: { (): void }
  goBack: { (): void }
  onConfirmPassword: { (password: string, error: NullAppError): void }
  onNewPassword: { (error: NullAppError): void }
  isDisabled: boolean;
  newPasswordError: NullAppError;
  confirmPasswordError: NullAppError;
  hasError: boolean;
}

const PasswordStep = (props: Props): JSX.Element => (
  <div class='signup-form__passwords'>
    <InputNewPassword
      onConfirmPassword={props.onConfirmPassword}
      onNewPassword={props.onNewPassword}
      newPasswordError={props.newPasswordError}
      confirmPasswordError={props.confirmPasswordError}
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
        hasError={props.hasError}
        isDisabled={props.isDisabled}
        onClick={props.onSubmit} />
    </div>
  </div>
);

export default PasswordStep;
