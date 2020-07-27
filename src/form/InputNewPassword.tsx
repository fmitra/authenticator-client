import { h, Component } from 'preact';

import { InputPassword } from '@authenticator/form';
import { NullAppError } from '@authenticator/errors';

interface Props {
  id: string;
  class: string;
  labelNew?: string;
  labelConfirm?: string;
  placeholderNew?: string;
  placeholderConfirm?: string;
  onConfirmPassword: { (password: string, error: NullAppError): void };
  onNewPassword: { (error: NullAppError): void };
  newPasswordError: NullAppError;
  confirmPasswordError: NullAppError;
}

interface State {
  newPassword: string;
  confirmedPassword: string;
}

export default class InputNewPassword extends Component<Props, State> {
  onEnterPassword = (evt: Event, error: NullAppError): void => {
    const { value } = (evt.currentTarget as HTMLFormElement);
    const { onNewPassword } = this.props;

    this.setState({ newPassword: value });

    onNewPassword(error);
  }

  onConfirmPassword = (evt: Event, error: NullAppError): void => {
    const { value } = (evt.currentTarget as HTMLFormElement);
    const { onConfirmPassword } = this.props;

    this.setState({ confirmedPassword: value });

    console.log('confirming password', error);
    onConfirmPassword(value, error);
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
          onChange={this.onEnterPassword}
          error={this.props.newPasswordError}
          id='new-password' />
        <InputPassword
          class='input-new-password__confirm'
          placeholder='Confirm Password'
          value={this.state.confirmedPassword}
          onChange={this.onConfirmPassword}
          validator={this.validateConfirmedPassword}
          error={this.props.confirmPasswordError}
          id='confirmed-password' />
      </div>
    );
  }
};
