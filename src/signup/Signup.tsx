import { h, Component } from 'preact';

import { SignupRequest } from '@authenticator/requests';
import { NullAppError, FormErrors } from '@authenticator/errors';
import { ContactMethod } from '@authenticator/identity/contact';
import { UsernameStep, PasswordStep } from '@authenticator/signup/components';

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
    this.setState({
      username: username,
      identityType: method,
      errors: this.state.errors.update(error, 'username'),
    });
  }

  handlePassword = (password: string, error: NullAppError): void => {
    this.setState({
      password,
      errors: this.state.errors.update(error, 'password'),
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
          { !this.state.isUsernameSet && <UsernameStep
            onChange={this.handleUsername}
            isDisabled={this.props.isRequesting || !this.state.username}
            error={this.state.errors.get('username')}
            onSubmit={this.toggleUsername} /> }

          { this.state.isUsernameSet && <PasswordStep
            onSubmit={this.handleSignup}
            isDisabled={this.props.isRequesting || !this.state.password}
            goBack={this.toggleUsername}
            error={this.state.errors.get('password')}
            onChange={this.handlePassword}
            /> }
        </form>
      </div>
    );
  }
};
