import { Dispatch } from 'redux';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { verifyCode, verifyDevice, Verification } from '@authenticator/loginVerify/actions';
import { State } from '@authenticator/loginVerify/reducer';
import { VerifyCodeRequest } from '@authenticator/requests';
import LoginVerify from '@authenticator/loginVerify/LoginVerify';

const mapDispatchToProps = (dispatch: Dispatch): {
  verifyCode: { (data: VerifyCodeRequest): Verification };
  verifyDevice: { (credentialsAPI: CredentialsContainer): Verification };
} => (
  bindActionCreators({ verifyCode, verifyDevice }, dispatch)
);

const mapStateToProps = (state: { loginVerify: State }): State => ( state.loginVerify );

export default connect(mapStateToProps, mapDispatchToProps)(LoginVerify);
