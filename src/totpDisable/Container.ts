import { Dispatch } from 'redux';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { disable, TOTPManagement } from '@authenticator/totpDisable/actions';
import { State } from '@authenticator/totpDisable/reducer';
import { TOTPRequest } from '@authenticator/requests';
import TOTPDisable from '@authenticator/totpDisable/TOTPDisable';

const mapDispatchToProps = (dispatch: Dispatch): {
  disable: { (data: TOTPRequest ): TOTPManagement };
} => (
  bindActionCreators({ disable }, dispatch)
);

const mapStateToProps = (state: { totpDisable: State }): State => ( state.totpDisable );

export default connect(mapStateToProps, mapDispatchToProps)(TOTPDisable);
