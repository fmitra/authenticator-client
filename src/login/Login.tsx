import { h, Component  } from 'preact';

import { LoginRequest } from '@authenticator/requests';
import { NullAppError, FormErrors } from '@authenticator/errors';
import {
  Button,
  InputContact,
  InputPassword,
} from '@authenticator/form';
import { ContactMethod } from '@authenticator/identity/contact';
import { Splash, SignupInstead, LoginHeader } from '@authenticator/login/components';
import { AppLayout, Disclaimer } from '@authenticator/ui/components';

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

  handleUsername = (username: string, method: ContactMethod): void => {
    this.setErrors('username', null, false);
    this.setState({
      username: username,
      identityType: method,
      errors: this.state.errors,
    });
  }

  handlePassword = (password: string): void => {
    this.setErrors('password', null, false);
    this.setState({
      password: password,
      errors: this.state.errors,
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
      <AppLayout class='login' withoutWrapper={true}>
        <Splash />
        <div class='login-form'>
          <LoginHeader />
          <InputContact
            onInput={this.handleUsername}
            onChange={(e: Event, error: NullAppError): void => {
              this.setErrors('username', error);
            }}
            language={window.navigator.language || ''}
            value={this.state.username}
            error={
              this.state.errors.get('username') ||
              this.state.errors.get('request')
            }
            id='login-username' />
          <InputPassword
            onInput={this.handlePassword}
            onChange={(evt: Event, error: NullAppError): void => {
              this.setErrors('password', error);
            }}
            error={this.state.errors.get('password')}
            value={this.state.password}
            placeholder='Password'
            id='login-password' />

          <Button
            name='Next'
            class='button--wide'
            hasError={this.state.errors.notOk}
            isDisabled={this.props.isRequesting || !isFormFilled}
            onClick={this.handleSubmit} />

          <SignupInstead />
          <Disclaimer class='login-disclaimer' />
        </div>
      </AppLayout>
    );
  }
};
