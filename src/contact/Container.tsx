import { h, Component } from 'preact';

import { Dispatch } from 'redux';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { NullAppError } from '@authenticator/errors';
import { checkAddress, verify, ContactThunk} from '@authenticator/contact/actions';
import { State } from '@authenticator/contact/reducer';
import { VerifyContactRequest, DeliveryRequest } from '@authenticator/requests';
import Contact from '@authenticator/contact/Contact';
import Verify from '@authenticator/contact/Verify';
import Success from '@authenticator/contact/Success';

const mapDispatchToProps = (dispatch: Dispatch): {
  checkAddress: { (data: DeliveryRequest): ContactThunk };
  verify: { (data: VerifyContactRequest): ContactThunk };
} => (
  bindActionCreators({ checkAddress, verify }, dispatch)
);

const mapStateToProps = (state: { contact: State }): State => ( state.contact );

export interface Props {
  path?: string;
  error: NullAppError;
  checkAddress: { (data: DeliveryRequest): any };
  verify: { (data: VerifyContactRequest): any };
  isRequesting: boolean;
  needAccountDetails: boolean;
  needVerification: boolean;
}

class Container extends Component<Props, {}> {
  render(): JSX.Element {
    if (this.props.needAccountDetails) {
      return (
        <Contact
          error={this.props.error}
          checkAddress={this.props.checkAddress}
          isRequesting={this.props.isRequesting} />
      );
    }

    if (this.props.needVerification) {
      return (
        <Verify
          error={this.props.error}
          isRequesting={this.props.isRequesting}
          verify={this.props.verify} />
      );
    }

    return <Success />
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
