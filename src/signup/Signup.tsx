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

  handleUsername = (username: string, method: ContactMethod, error: NullAppError): void => {
    this.state.errors.update(error, 'username');
    this.state.errors.update(null, 'request');

    this.setState({
      username: username,
      identityType: method,
      errors: this.state.errors,
    });
  }

  handleNewPassword = (error: NullAppError): void => {
    this.state.errors.update(error, 'newPassword');
    this.state.errors.update(null, 'request');

    this.setState({ errors: this.state.errors });
  }

  handleConfirmedPassword = (password: string, error: NullAppError): void => {
    this.state.errors.update(error, 'confirmedPassword'),
    this.state.errors.update(null, 'request'),

    this.setState({
      password,
      errors: this.state.errors,
    });
  }

  handleSignup = (): void => {
    this.props.register({
      type: this.state.identityType,
      password: this.state.password,
      identity: this.state.username,
    });
  }

  toggleUsername = (): void => {
    this.setState({ isUsernameSet: !this.state.isUsernameSet });
  }

  render(): JSX.Element {
    return (
      <div class='signup'>
        <form class='signup-form'>
          <SignupHeader
            goBack={this.toggleUsername}
            isIntro={!this.state.isUsernameSet}
            username={this.state.username} />

          { !this.state.isUsernameSet && <UsernameStep
            onChange={this.handleUsername}
            value={this.state.username}
            isDisabled={this.props.isRequesting || !this.state.username}
            hasError={this.state.errors.notOk}
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
            onConfirmPassword={this.handleConfirmedPassword}
            onNewPassword={this.handleNewPassword}
            /> }

          <Disclaimer />

          { !this.state.isUsernameSet && <LoginInstead /> }
        </form>
      </div>
    );
  }
};
