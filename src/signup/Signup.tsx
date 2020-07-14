import { h, Component } from 'preact';

import config from '@authenticator/config';
import { SignupRequest } from '@authenticator/requests';
import { NullAppError, FormErrors, Errors } from '@authenticator/errors';
import { IDToggle } from '@authenticator/signup/components';
import {
  Button,
  InputPhone,
  InputEmail,
  InputPassword,
} from '@authenticator/form';
import { PHONE, EMAIL, ContactMethod } from '@authenticator/identity/contact';

export interface Props {
  path?: string;
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

    let identityType = EMAIL;

    if (!config.validUserIdentity.email && config.validUserIdentity.phone) {
      identityType = PHONE;
    }

    this.state = {
      identityType,
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

  handleToggleID = (): void => {
    const newIDType = this.state.identityType === PHONE
      ? EMAIL
      : PHONE;

    this.setState({ identityType: newIDType });
  }

  handleUsername = (evt: Event, error: NullAppError): void => {
    const { value } = (evt.currentTarget as HTMLFormElement);
    this.setState({
      username: value,
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
    const renderIDToggle = (
      config.validUserIdentity.email &&
      config.validUserIdentity.phone
    );
    const renderEmail = this.state.identityType === EMAIL;
    const renderPhone = this.state.identityType === PHONE;

    return (
      <div class='signup'>
        <form class='signup-form'>
          <InputPassword
            onChange={this.handlePassword}
            class='signup-input'
            label='Password'
            id='signup-password' />
          { renderEmail && <InputEmail
            onChange={this.handleUsername}
            class='signup-input'
            label='Username'
            id='signup-username-email' /> }
          { renderPhone && <InputPhone
            onChange={this.handleUsername}
            class='signup-input'
            label='Username'
            id='signup-username-phone' /> }
          { renderIDToggle && <IDToggle
            onClick={this.handleToggleID}
            activeID={this.state.identityType} /> }

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
