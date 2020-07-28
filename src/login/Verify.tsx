import { h, Component } from 'preact';

import { SendRequest, VerifyCodeRequest } from '@authenticator/requests';
import { NullAppError, FormErrors } from '@authenticator/errors';
import { TFAOptions, TFADevice, TFACode } from '@authenticator/login/components';
import { CodeHeader } from '@authenticator/ui/components';
import { PHONE, EMAIL } from '@authenticator/identity/contact';
import Token, {
  TFAOption,
  Device,
  OTPEmail,
  OTPPhone,
} from '@authenticator/identity/Token';

interface State {
  errors: FormErrors;
  code: string;
  isDeviceView: boolean;
}

interface Props {
  error: NullAppError;
  isRequesting: boolean;
  verifyCode: { (data: VerifyCodeRequest): any };
  verifyDevice: { (credentialsAPI: CredentialsContainer): any };
  resendCode: { (data: SendRequest): any };
  restartFlow: { (): any };
}

export default class LoginVerify extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      code: '',
      errors: new FormErrors(),
      isDeviceView: Token.defaultTFA === Device,
    }
  }

  static defaultProps = {
    error: null,
    isRequesting: false,
    verifyDevice: (credentialsAPI: CredentialsContainer): void => {},
    verifyCode: (data: VerifyCodeRequest): void => {},
    resendCode: (data: SendRequest): void => {},
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

  setTFAOption = (option: TFAOption): void => {
    this.state.errors.update(null, 'request');

    if (option === Device) {
      this.setState({
        isDeviceView: true,
        errors: this.state.errors,
      });
      return;
    }

    this.setState({
      isDeviceView: false,
      errors: this.state.errors,
    });

    if (option === OTPPhone) {
      this.props.resendCode({ deliveryMethod: PHONE });
    } else if (option === OTPEmail) {
      this.props.resendCode({ deliveryMethod: EMAIL });
    }
  }

  render(): JSX.Element {
    return (
      <div class='login'>
        <div class='login-verify'>
          <CodeHeader lastMessageAddress={Token.lastMessageAddress} goBack={this.props.restartFlow} />

          { this.state.isDeviceView ?
            <TFADevice verifyDevice={this.props.verifyDevice} /> :
            <TFACode
              value={this.state.code}
              error={this.state.errors.get('code')}
              handleCode={this.handleCode}
              isDisabled={this.props.isRequesting || !this.state.code}
              hasError={this.state.errors.notOk}
              handleSubmit={this.handleSubmit}  /> }

          <TFAOptions setTFAOption={this.setTFAOption} options={Token.tfaOptions} />
        </div>
      </div>
    )
  }
};
