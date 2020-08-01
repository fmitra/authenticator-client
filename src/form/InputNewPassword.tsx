import { h, Component } from 'preact';

import { InputPassword } from '@authenticator/form';
import { NullAppError } from '@authenticator/errors';

interface Props {
  id: string;
  class?: string;
  labelNew?: string;
  labelConfirm?: string;
  placeholderNew?: string;
  placeholderConfirm?: string;
  onConfirmPasswordInput: { (password: string): void };
  onNewPasswordInput: { (): void };
  onNewPasswordChange: { (error: NullAppError): void };
  onConfirmPasswordChange: { (error: NullAppError): void };
  newPasswordError: NullAppError;
  confirmPasswordError: NullAppError;
}

interface State {
  newPassword: string;
  confirmedPassword: string;
}

/**
 * A dual input field to submit and confirm a new password.
 */
export default class InputNewPassword extends Component<Props, State> {
  handleNewPasswordChange = (evt: Event, error: NullAppError): void => {
    const { onNewPasswordChange } = this.props;
    onNewPasswordChange(error);
  }

  handleNewPasswordInput = (password: string): void => {
    const { onNewPasswordInput } = this.props;
    this.setState({ newPassword: password });
    onNewPasswordInput();
  }

  handleConfirmPasswordChange = (evt: Event, error: NullAppError): void => {
    const { onConfirmPasswordChange } = this.props;
    onConfirmPasswordChange(error);
  }

  handleConfirmPasswordInput = (password: string): void => {
    const { onConfirmPasswordInput } = this.props;

    this.setState({ confirmedPassword: password });
    onConfirmPasswordInput(password);
  }

  validateConfirmedPassword = (inputValue: string | number): NullAppError => {
    const password = this.state.newPassword;
    if (password == String(inputValue)) {
      return null;
    }

    return {
      message: 'Passwords do not match',
      code: 'invalid_password',
    };
  }

  render(): JSX.Element {
    return (
      <div class='input-new-password'>
        <InputPassword
          class='input-new-password__new'
          placeholder='Password'
          value={this.state.newPassword}
          onChange={this.handleNewPasswordChange}
          onInput={this.handleNewPasswordInput}
          error={this.props.newPasswordError}
          id='new-password' />
        <InputPassword
          class='input-new-password__confirm'
          placeholder='Confirm Password'
          value={this.state.confirmedPassword}
          onChange={this.handleConfirmPasswordChange}
          onInput={this.handleConfirmPasswordInput}
          validator={this.validateConfirmedPassword}
          error={this.props.confirmPasswordError}
          id='confirmed-password' />
      </div>
    );
  }
};
