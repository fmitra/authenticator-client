import { h, Component } from 'preact';

import { SendRequest, VerifyCodeRequest } from '@authenticator/requests';
import { NullAppError, Errors, FormErrors } from '@authenticator/errors';
import {
  DeviceHeader,
  TFAOptions,
  TFADevice,
  TFACode,
} from '@authenticator/login/components';
import { Disclaimer, CodeHeader } from '@authenticator/ui/components';
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

  componentWillReceiveProps(props: Props, state: State): void {
    this.setState({
      errors: this.state.errors.update(props.error, 'request'),
    });
  }

  handleCode = (code: string): void => {
    this.setErrors('code', null, false);
    this.setState({
      code,
      errors: this.state.errors,
    });
  }

  handleSubmit = (): void => {
    this.props.verifyCode({ code: this.state.code });
  }

  setTFAOption = (option: TFAOption): void => {
    this.setErrors('code', null, false);

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

  setErrors = (key: string, error: NullAppError, withState: boolean = true): void => {
    this.state.errors
      .update(error, key)
      .update(null, 'request');
    if (withState) {
      this.setState({ errors: this.state.errors });
    }
  }

  render(): JSX.Element {
    return (
      <div class='login'>
        <div class='login-verify'>
          { !this.state.isDeviceView ?
            <CodeHeader
              lastMessageAddress={Token.lastMessageAddress}
              goBack={this.props.restartFlow} /> :
            <DeviceHeader /> }

          { this.state.isDeviceView ?
            <TFADevice
              verifyDevice={this.props.verifyDevice}
              isRequesting={this.props.isRequesting} /> :
            <TFACode
              value={this.state.code}
              error={
                this.state.errors.get('code') ||
                this.state.errors.get('request')
              }
              handleCode={this.handleCode}
              handleChange={(evt: Event, error: NullAppError): void => {
                this.setErrors('code', error);
              }}
              isDisabled={this.props.isRequesting || !this.state.code}
              hasError={this.state.errors.notOk}
              handleSubmit={this.handleSubmit}  /> }

          {this.state.errors.notOk && this.state.isDeviceView && <Errors
            class='login-verify__errors'
            errors={this.state.errors} />}

          <TFAOptions setTFAOption={this.setTFAOption} options={Token.tfaOptions} />
          <Disclaimer />
        </div>
      </div>
    )
  }
};
