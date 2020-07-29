import { h, Component  } from 'preact';

import { LoginRequest } from '@authenticator/requests';
import { NullAppError, FormErrors } from '@authenticator/errors';
import {
  Button,
  InputContact,
  InputPassword,
} from '@authenticator/form';
import { ContactMethod } from '@authenticator/identity/contact';
import { SignupInstead, LoginHeader } from '@authenticator/login/components';
import { Disclaimer } from '@authenticator/ui/components';

interface Props {
  error: NullAppError;
  login: { (data: LoginRequest): any };
  isRequesting: boolean;
}

interface State {
  identityType: ContactMethod;
  username: string;
  password: string;
  errors: FormErrors;
}

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      identityType: '',
      username: '',
      password: '',
      errors: new FormErrors(),
    };
  }

  static defaultProps = {
    error: null,
    login: (data: LoginRequest): void => {},
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

  handlePassword = (evt: Event, error: NullAppError): void => {
    const { value } = (evt.currentTarget as HTMLFormElement);

    this.state.errors.update(error, 'password');
    this.state.errors.update(null, 'request');

    this.setState({
      password: value,
      errors: this.state.errors,
    });
  }

  handleSubmit = (): void => {
    this.props.login({
      type: this.state.identityType,
      password: this.state.password,
      identity: this.state.username,
    });
  }

  render(): JSX.Element {
    const isFormFilled = this.state.username && this.state.password;

    return (
      <div class='login'>
        <div class='login-splash'>
        </div>
        <form class='login-form'>
          <LoginHeader />
          <InputContact
            onChange={this.handleUsername}
            language={window.navigator.language || ''}
            class='login-input'
            value={this.state.username}
            error={
              this.state.errors.get('username') ||
              this.state.errors.get('request')
            }
            id='login-username' />
          <InputPassword
            onChange={this.handlePassword}
            class='login-input'
            error={this.state.errors.get('password')}
            value={this.state.password}
            placeholder='Password'
            id='login-password' />

          <Button
            name='Next'
            class='login-btn'
            hasError={this.state.errors.notOk}
            isDisabled={this.props.isRequesting || !isFormFilled}
            onClick={this.handleSubmit} />

          <SignupInstead />
          <Disclaimer class='login-disclaimer' />
        </form>
      </div>
    );
  }
};
