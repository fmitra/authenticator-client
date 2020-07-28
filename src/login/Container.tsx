import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';

import { NullAppError } from '@authenticator/errors';
import {
  login,
  verifyCode,
  verifyDevice,
  resendCode,
  restartFlow,
  LoginThunk,
} from '@authenticator/login/actions';
import { State } from '@authenticator/signup/reducer';
import { VerifyCodeRequest, SendRequest, LoginRequest } from '@authenticator/requests';
import Login from '@authenticator/login/Login';
import Verify from '@authenticator/login/Verify';
import Success from '@authenticator/login/Success';

const mapDispatchToProps = (dispatch: Dispatch): {
  login: { (data: LoginRequest): LoginThunk };
  verifyCode: { (data: VerifyCodeRequest): LoginThunk };
  resendCode: { (data: SendRequest): LoginThunk };
  verifyDevice: { (credentialsAPI: CredentialsContainer): LoginThunk };
  restartFlow: { (): LoginThunk };
} => (
  bindActionCreators({ verifyCode, resendCode, verifyDevice, login, restartFlow }, dispatch)
);

const mapStateToProps = (state: { login: State }): State => ( state.login );

interface Props {
  path?: string;
  error: NullAppError;
  login: { (data: LoginRequest): any };
  verifyCode: { (data: VerifyCodeRequest): any };
  verifyDevice: { (credentialsAPI: CredentialsContainer): any };
  resendCode: { (data: SendRequest): any };
  restartFlow: { (): any };
  isRequesting: boolean;
  needAccountDetails: boolean;
  needVerification: boolean;
}

class Container extends Component<Props, {}> {
  render(): JSX.Element {
    if (this.props.needAccountDetails) {
      return (
        <Login
          error={this.props.error}
          login={this.props.login}
          isRequesting={this.props.isRequesting} />
      );
    }

    if (this.props.needVerification) {
      return (
        <Verify
          error={this.props.error}
          verifyCode={this.props.verifyCode}
          restartFlow={this.props.restartFlow}
          verifyDevice={this.props.verifyDevice}
          resendCode={this.props.resendCode}
          isRequesting={this.props.isRequesting} />
      );
    }

    return (
      <Success />
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
