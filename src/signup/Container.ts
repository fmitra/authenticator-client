import { Dispatch } from 'redux';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { register, Registration } from '@authenticator/signup/actions';
import { State } from '@authenticator/signup/reducer';
import { SignupRequest } from '@authenticator/requests';
import Signup from '@authenticator/signup/Signup';

//const mapDispatchToProps = (dispatch: Dispatch): { register: Registration } => (
const mapDispatchToProps = (dispatch: Dispatch): { register: { (data: SignupRequest): Registration }} => (
  bindActionCreators({ register }, dispatch)
);

const mapStateToProps = (state: { signup: State }): State => ( state.signup );

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
