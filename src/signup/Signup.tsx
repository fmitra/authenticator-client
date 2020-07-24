import { h, Component } from 'preact';

import { SignupRequest } from '@authenticator/requests';
import { NullAppError, FormErrors, Errors } from '@authenticator/errors';
import {
  Button,
  InputContact,
  InputPassword,
} from '@authenticator/form';
import { ContactMethod } from '@authenticator/identity/contact';

export interface Props {
  error: NullAppError;
  register: { (data: SignupRequest): any };
  isRequesting: boolean;
}

interface State {
  identityType: ContactMethod;
  username: string;
  password: string;
  errors: FormErrors;
}

export default class Signup extends Component<Props, State> {
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

  handlePassword = (evt: Event, error: NullAppError): void => {
    const { value } = (evt.currentTarget as HTMLFormElement);
    this.setState({
      password: value,
      errors: this.state.errors.update(error, 'password'),
    });
  }

  handleSubmit = (): void => {
    this.props.register({
      type: this.state.identityType,
      password: this.state.password,
      identity: this.state.username,
    });
  }

  render(): JSX.Element {
    return (
      <div class='signup'>
        <form class='signup-form'>
          <InputContact
            onChange={this.handleUsername}
            language={window.navigator.language || ''}
            class='signup-input'
            label='Username'
            id='signup-username' />
          <InputPassword
            onChange={this.handlePassword}
            class='signup-input'
            label='Password'
            id='signup-password' />

          <Errors class='signup__errors' errors={this.state.errors} />

          <Button
            name='Signup'
            hasError={this.state.errors.notOk}
            isDisabled={this.props.isRequesting}
            onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
};
