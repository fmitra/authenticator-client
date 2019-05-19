import { Dispatch } from 'redux';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { verify, Verification } from '@authenticator/signupVerify/actions';
import { State } from '@authenticator/signupVerify/reducer';
import { VerifyRequest } from '@authenticator/requests';
import SignupVerify from '@authenticator/signupVerify/SignupVerify';

const mapDispatchToProps = (dispatch: Dispatch): {
  verify: { (data: VerifyRequest): Verification };
} => (
  bindActionCreators({ verify }, dispatch)
);

const mapStateToProps = (state: { signupVerify: State }): State => ( state.signupVerify );

export default connect(mapStateToProps, mapDispatchToProps)(SignupVerify);
