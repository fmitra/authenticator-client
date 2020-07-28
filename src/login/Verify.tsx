import { h, Component } from 'preact';

import { VerifyCodeRequest } from '@authenticator/requests';
import { NullAppError, FormErrors } from '@authenticator/errors';
import { TFAOptions, TFADevice, TFACode } from '@authenticator/login/components';
import { CodeHeader } from '@authenticator/ui/components';
import Token, { Device } from '@authenticator/identity/Token';

interface State {
  errors: FormErrors;
  code: string;
}

interface Props {
  error: NullAppError;
  isRequesting: boolean;
  verifyCode: { (data: VerifyCodeRequest): any };
  verifyDevice: { (credentialsAPI: CredentialsContainer): any };
  restartFlow: { (): any };
}

export default class LoginVerify extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      code: '',
      errors: new FormErrors(),
    }
  }

  static defaultProps = {
    error: null,
    isRequesting: false,
    verifyDevice: (credentialsAPI: CredentialsContainer): void => {},
    verifyCode: (data: VerifyCodeRequest): void => {},
    restartFlow: (): void => {},
  }

  handleCode = (code: string, error: NullAppError): void => {
    this.state.errors.update(null, 'request');
    this.state.errors.update(error, 'code');

    this.setState({
      code,
      errors: this.state.errors,
    });
  }

  handleSubmit = (): void => {
    this.props.verifyCode({ code: this.state.code });
  }

  render(): JSX.Element {
    const isDefaultDevice = Token.defaultTFA === Device;

    return (
      <div class='login'>
        <div class='login-verify'>
          <CodeHeader goBack={this.props.restartFlow} />

          { isDefaultDevice ?
            <TFADevice verifyDevice={this.props.verifyDevice} /> :
            <TFACode
              value={this.state.code}
              error={this.state.errors.get('code')}
              handleCode={this.handleCode}
              isDisabled={this.props.isRequesting || !this.state.code}
              hasError={this.state.errors.notOk}
              handleSubmit={this.handleSubmit}  /> }

          {/* TODO Toggle between device and code */}
          <TFAOptions options={Token.tfaOptions} />
        </div>
      </div>
    )
  }
};
