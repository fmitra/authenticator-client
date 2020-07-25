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
  onChange: { (password: string, error: NullAppError): void };
}

interface State {
  password: string;
}

export default class InputNewPassword extends Component<Props, State> {
  onEnterPassword = (evt: Event, error: NullAppError): void => {
    const { value } = (evt.currentTarget as HTMLFormElement);
    this.setState({ password: value });
  }

  onConfirmPassword = (evt: Event, error: NullAppError): void => {
    const { value } = (evt.currentTarget as HTMLFormElement);
    const { onChange } = this.props;

    onChange(value, error);
  }

  validateConfirmedPassword = (inputValue: string | number): NullAppError => {
    const password = this.state.password;
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
          onChange={this.onEnterPassword}
          id='new-password' />
        <InputPassword
          class='input-new-password__confirm'
          placeholder='Confirm Password'
          onChange={this.onConfirmPassword}
          validator={this.validateConfirmedPassword}
          id='confirmed-password' />
      </div>
    );
  }
};
