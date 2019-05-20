import { h, Component } from 'preact';
import { route } from 'preact-router';

import config from '@authenticator/config';
import routes from '@authenticator/app/routes';
import { Button } from '@authenticator/form';
import { SignupRequest } from '@authenticator/requests';
import { NullAppError, FormErrors, Errors } from '@authenticator/errors';
import {
  IDToggle,
  InputPassword,
  InputEmail,
  InputPhone,
} from '@authenticator/signup/components';
import { INPUT_PHONE, INPUT_EMAIL } from '@authenticator/signup/constants';

export interface Props {
  path?: string;
  error: NullAppError;
  register: { (data: SignupRequest): any };
  isRegistered: boolean;
  isRequesting: boolean;
}

interface State {
  identityType: string;
  username: string;
  password: string;
  errors: FormErrors;
}

export default class Signup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    let identityType = '';

    if (config.validUserIdentity.phone) {
      identityType = INPUT_PHONE;
    }

    if (config.validUserIdentity.email) {
      identityType = INPUT_EMAIL;
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
    isRegistered: false,
    isRequesting: false,
  };

  componentWillReceiveProps(props: Props, state: State): void {
    this.setState({
      errors: this.state.errors.update(props.error, 'request'),
    });

    if (props.isRegistered) {
      route(routes.SIGNUP_VERIFY);
    }
  }

  handleToggleID = (): void => {
    const newIDType = this.state.identityType === INPUT_PHONE
      ? INPUT_EMAIL
      : INPUT_PHONE;

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
    const renderEmail = this.state.identityType === INPUT_EMAIL;
    const renderPhone = this.state.identityType === INPUT_PHONE;

    return (
      <div class='signup'>
        <form class='signup-form'>
          <InputPassword onChange={this.handlePassword} />
          { renderEmail && <InputEmail onChange={this.handleUsername} /> }
          { renderPhone && <InputPhone onChange={this.handleUsername} /> }
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
