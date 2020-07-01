import { Dispatch } from 'redux';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { secret, enable, TOTPManagement } from '@authenticator/totp/actions';
import { State } from '@authenticator/totp/reducer';
import { TOTPRequest } from '@authenticator/requests';
import TOTP from '@authenticator/totp/TOTP';

const mapDispatchToProps = (dispatch: Dispatch): {
  secret: { ():  TOTPManagement };
  enable: { (data: TOTPRequest ): TOTPManagement };
} => (
  bindActionCreators({ secret, enable }, dispatch)
);

const mapStateToProps = (state: { totp: State }): State => ( state.totp );

export default connect(mapStateToProps, mapDispatchToProps)(TOTP);
