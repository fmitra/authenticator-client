import { Dispatch } from 'redux';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { registerDevice, PublicKeyCreation } from '@authenticator/device/actions';
import { State } from '@authenticator/device/reducer';
import Device from '@authenticator/device/Device';

const mapDispatchToProps = (dispatch: Dispatch): {
  registerDevice: { (credentialsAPI: CredentialsContainer): PublicKeyCreation };
} => (
  bindActionCreators({ registerDevice }, dispatch)
);

const mapStateToProps = (state: { device: State }): State => ( state.device );

export default connect(mapStateToProps, mapDispatchToProps)(Device);
