import { h, Component } from 'preact';

import { VerifyCodeRequest } from '@authenticator/requests';
import { NullAppError, FormErrors, Errors } from '@authenticator/errors';
import { TFAOptions, TFADevice, TFACode } from '@authenticator/loginVerify/components';
import Token, { Device } from '@authenticator/identity/Token';

interface State {
  errors: FormErrors;
}

interface Props {
  path?: string;
  error: NullAppError;
  isRequesting: boolean;
  verifyCode: { (data: VerifyCodeRequest): any };
  verifyDevice: { (credentialsAPI: CredentialsContainer): any };
}

export default class LoginVerify extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      errors: new FormErrors(),
    }
  }

  static defaultProps = {
    error: null,
    isRequesting: false,
    verifyDevice: (credentialsAPI: CredentialsContainer): void => {},
    verifyCode: (data: VerifyCodeRequest): void => {},
  }

  render(): JSX.Element {
    const isDefaultDevice = Token.defaultTFA === Device;

    return (
      <div class='login-verify'>
        { isDefaultDevice ?
          <TFADevice /> :
          <TFACode
            errors={this.state.errors}
            isRequesting={this.props.isRequesting}
            handleSubmit={this.props.verifyCode}  /> }

        <button onClick={() => this.props.verifyDevice(window.navigator.credentials)}>Test</button>
        <Errors class='login-verify__errors' errors={this.state.errors} />

        <TFAOptions options={Token.tfaOptions} />
      </div>
    )
  }
};
