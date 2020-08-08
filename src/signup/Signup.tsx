import { h, Component } from 'preact';

import { SignupRequest } from '@authenticator/requests';
import { NullAppError, FormErrors } from '@authenticator/errors';
import { ContactMethod } from '@authenticator/identity/contact';
import {
  UsernameStep,
  PasswordStep,
  Disclaimer,
  LoginInstead,
  SignupHeader,
} from '@authenticator/signup/components';
import { AppLayout } from '@authenticator/ui/components';

export interface Props {
  error: NullAppError;
  register: { (data: SignupRequest): any };
  isRequesting: boolean;
}

interface State {
  identityType: ContactMethod;
  username: string;
  password: string;
  isUsernameSet: boolean;
  errors: FormErrors;
}

export default class Signup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      identityType: '',
      username: '',
      password: '',
      isUsernameSet: false,
      errors: new FormErrors(),
    };
  }

  static defaultProps = {
    error: null,
    register: (data: SignupRequest): void => {},
    isRequesting: false,
  };

  componentWillReceiveProps(props: Props, state: State): void {
    this.setState({
      errors: this.state.errors.update(props.error, 'request'),
    });
  }

  handleUsername = (username: string, method: ContactMethod): void => {
    this.setErrors('username', null, false);
    this.setState({
      username: username,
      identityType: method,
      errors: this.state.errors,
    });
  }

  handleConfirmedPassword = (password: string): void => {
    this.setErrors('confirmedPassword', null, false);
    this.setState({
      password,
      errors: this.state.errors,
    });
  }

  handleNewPassword = (): void => {
    if (this.state.errors.get('newPassword')) {
      this.state.errors.update(null, 'newPassword');
      this.setState({ errors: this.state.errors });
    }
  }

  handleSignup = (): void => {
    this.props.register({
      type: this.state.identityType,
      password: this.state.password,
      identity: this.state.username,
    });
  }

  setErrors = (key: string, error: NullAppError, withState: boolean = true): void => {
    this.state.errors
      .update(error, key)
      .update(null, 'request');
    if (withState) {
      this.setState({ errors: this.state.errors });
    }
  }

  toggleUsername = (): void => {
    this.setState({ isUsernameSet: !this.state.isUsernameSet });
  }

  render(): JSX.Element {
    return (
      <AppLayout class='container--graphic signup'>
        <SignupHeader
          goBack={this.toggleUsername}
          isIntro={!this.state.isUsernameSet}
          username={this.state.username} />

        { !this.state.isUsernameSet && <UsernameStep
          onInput={this.handleUsername}
          onChange={(e: Event, error: NullAppError): void => {
            this.setErrors('username', error);
          }}
          value={this.state.username}
          isDisabled={!this.state.username}
          hasError={Boolean(this.state.errors.get('username'))}
          error={this.state.errors.get('username')}
          onSubmit={this.toggleUsername} /> }

        { this.state.isUsernameSet && <PasswordStep
          onSubmit={this.handleSignup}
          isDisabled={this.props.isRequesting || !this.state.password}
          goBack={this.toggleUsername}
          hasError={this.state.errors.notOk}
          newPasswordError={this.state.errors.get('newPassword')}
          confirmPasswordError={
            this.state.errors.get('confirmedPassword') ||
            // Render any server errors next to the confirm password input
            this.state.errors.get('request')
          }
          onNewPasswordInput={this.handleNewPassword}
          onConfirmPasswordInput={this.handleConfirmedPassword}
          onConfirmPasswordChange={(error: NullAppError): void => {
            this.setErrors('confirmedPassword', error);
          }}
          onNewPasswordChange={(error: NullAppError): void => {
            this.setErrors('newPassword', error);
          }} /> }

        <Disclaimer />

        { !this.state.isUsernameSet && <LoginInstead /> }
      </AppLayout>
    );
  }
};
