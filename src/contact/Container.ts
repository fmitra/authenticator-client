import { Dispatch } from 'redux';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { checkAddress, AddressCheck } from '@authenticator/contact/actions';
import { State } from '@authenticator/contact/reducer';
import { DeliveryRequest } from '@authenticator/requests';
import Contact from '@authenticator/contact/Contact';

const mapDispatchToProps = (dispatch: Dispatch): {
  checkAddress: { (data: DeliveryRequest): AddressCheck };
} => (
  bindActionCreators({ checkAddress }, dispatch)
);

const mapStateToProps = (state: { contact: State }): State => ( state.contact );

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
