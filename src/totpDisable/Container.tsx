import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';

import { NullAppError } from '@authenticator/errors';
import { disable, TOTPThunk } from '@authenticator/totpDisable/actions';
import { State } from '@authenticator/totpDisable/reducer';
import { TOTPRequest } from '@authenticator/requests';
import TOTPDisable from '@authenticator/totpDisable/TOTPDisable';
import Success from '@authenticator/totpDisable/Success';

const mapDispatchToProps = (dispatch: Dispatch): {
  disable: { (data: TOTPRequest ): TOTPThunk };
} => (
  bindActionCreators({ disable }, dispatch)
);

const mapStateToProps = (state: { totpDisable: State }): State => ( state.totpDisable );

interface Props {
  path?: string;
  error: NullAppError;
  disable: { (data: TOTPRequest): any };
  isRequesting: boolean;
  isDisabled: boolean;
}

class Container extends Component<Props, {}> {
  render(): JSX.Element {
    if (this.props.isDisabled) {
      return <Success />;
    }

    return (
      <TOTPDisable
        error={this.props.error}
        disable={this.props.disable}
        isRequesting={this.props.isRequesting} />
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
