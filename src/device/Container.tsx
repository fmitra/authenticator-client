import { h, Component } from 'preact';

import { Dispatch } from 'redux';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { NullAppError } from '@authenticator/errors';
import { registerDevice, PublicKeyCreation } from '@authenticator/device/actions';
import { State } from '@authenticator/device/reducer';
import Device from '@authenticator/device/Device';
import Success from '@authenticator/device/Success';

const mapDispatchToProps = (dispatch: Dispatch): {
  registerDevice: { (credentialsAPI: CredentialsContainer): PublicKeyCreation };
} => (
  bindActionCreators({ registerDevice }, dispatch)
);

const mapStateToProps = (state: { device: State }): State => ( state.device );

interface Props {
  path?: string;
  error: NullAppError;
  isRequesting: boolean;
  registerDevice: { (credentialsAPI: CredentialsContainer): any };
  isEnabled: boolean;
}

class Container extends Component<Props, {}> {
  render(): JSX.Element {
    if (this.props.isEnabled) {
      return <Success />;
    }

    return (
      <Device
        error={this.props.error}
        registerDevice={this.props.registerDevice}
        isRequesting={this.props.isRequesting} />
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
