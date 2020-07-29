import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';

import { NullAppError } from '@authenticator/errors';
import { secret, enable, TOTPThunk } from '@authenticator/totp/actions';
import { State } from '@authenticator/totp/reducer';
import { TOTPRequest } from '@authenticator/requests';
import TOTP from '@authenticator/totp/TOTP';
import Success from '@authenticator/totp/Success';

const mapDispatchToProps = (dispatch: Dispatch): {
  secret: { ():  TOTPThunk };
  enable: { (data: TOTPRequest ): TOTPThunk };
} => (
  bindActionCreators({ secret, enable }, dispatch)
);

const mapStateToProps = (state: { totp: State }): State => ( state.totp );

interface Props {
  path?: string;
  error: NullAppError;
  totp: string;
  secret: { (): any };
  enable: { (data: TOTPRequest): any };
  isRequesting: boolean;
  isEnabled: boolean;
}

class Container extends Component<Props, {}> {
  render(): JSX.Element {
    if (this.props.isEnabled) {
      return <Success />;
    }

    return (
      <TOTP
        error={this.props.error}
        totp={this.props.totp}
        secret={this.props.secret}
        enable={this.props.enable}
        isRequesting={this.props.isRequesting} />
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
