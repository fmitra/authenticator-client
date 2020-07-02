import { Dispatch } from 'redux';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { login, InitLogin } from '@authenticator/login/actions';
import { State } from '@authenticator/signup/reducer';
import { LoginRequest } from '@authenticator/requests';
import Login from '@authenticator/login/Login';

const mapDispatchToProps = (dispatch: Dispatch): {
  login: { (data: LoginRequest): InitLogin };
} => (
  bindActionCreators({ login }, dispatch)
);

const mapStateToProps = (state: { login: State }): State => ( state.login );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
