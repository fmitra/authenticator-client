import { h } from 'preact';

import { NullAppError } from '@authenticator/errors';
import { InputNewPassword, Button } from '@authenticator/form';

interface Props {
  onSubmit: { (): void };
  goBack: { (): void };
  onConfirmPasswordInput: { (password: string): void };
  onNewPasswordInput: { (): void };
  onNewPasswordChange: { (error: NullAppError): void };
  onConfirmPasswordChange: { (error: NullAppError): void };
  isDisabled: boolean;
  newPasswordError: NullAppError;
  confirmPasswordError: NullAppError;
  hasError: boolean;
}

const PasswordStep = (props: Props): JSX.Element => (
  <div class='signup-passwords'>
    <InputNewPassword
      onNewPasswordInput={props.onNewPasswordInput}
      onConfirmPasswordInput={props.onConfirmPasswordInput}
      onNewPasswordChange={props.onNewPasswordChange}
      onConfirmPasswordChange={props.onConfirmPasswordChange}
      newPasswordError={props.newPasswordError}
      confirmPasswordError={props.confirmPasswordError}
      id='signup-form-passwords' />
    <div class='signup-passwords__btns'>
      <Button
        name='Previous'
        class='signup-passwords__btns-secondary'
        hasError={false}
        isDisabled={false}
        onClick={props.goBack} />
      <Button
        name='Sign up'
        class='signup-passwords__btns-primary'
        hasError={props.hasError}
        isDisabled={props.isDisabled}
        onClick={props.onSubmit} />
    </div>
  </div>
);

export default PasswordStep;
