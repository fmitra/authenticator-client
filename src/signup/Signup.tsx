import { h, Component } from 'preact';

import config from '@authenticator/config';
import { Button, Input } from '@authenticator/form';
import { SignupRequest, APIError } from '@authenticator/requests';
import { IDToggle, InputEmail, InputPhone } from '@authenticator/signup/components';
import { INPUT_PHONE, INPUT_EMAIL } from '@authenticator/signup/constants';

export interface Props {
  path?: string;
  error: APIError | null;
  register: { (data: SignupRequest): any };
}

interface State {
  identityType: string;
  username: string;
  password: string;
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
    };
  }

  static defaultProps = {
    error: null,
    register: (data: SignupRequest): void => {},
  };

  handleToggleID = (): void => {
    const newIDType = this.state.identityType === INPUT_PHONE
      ? INPUT_EMAIL
      : INPUT_PHONE;

    this.setState({ identityType: newIDType });
  }

  handleUsername = (e: Event): void => {
    const { value } = (e.currentTarget as HTMLFormElement);
    this.setState({ username: value });
  }

  handlePassword = (e: Event): void => {
    const { value } = (e.currentTarget as HTMLFormElement);
    this.setState({ password: value });
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

    console.log(this.state);

    return (
      <div class='signup'>
        <form class='signup-form'>
          <Input
            class='signup-input'
            label='Password'
            type='password'
            onChange={this.handlePassword}
            id='signup-password' />

          { renderEmail && <InputEmail onChange={this.handleUsername} /> }
          { renderPhone && <InputPhone onChange={this.handleUsername} /> }
          { renderIDToggle && <IDToggle
            onClick={this.handleToggleID}
            activeID={this.state.identityType} /> }

          <Button name='Signup' onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
};
