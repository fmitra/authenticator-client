import { Dispatch } from 'redux';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import { verify, Verification } from '@authenticator/contactVerify/actions';
import { State } from '@authenticator/contactVerify/reducer';
import { VerifyContactRequest } from '@authenticator/requests';
import ContactVerify from '@authenticator/contactVerify/ContactVerify';

const mapDispatchToProps = (dispatch: Dispatch): {
  verify: { (data: VerifyContactRequest): Verification };
} => (
  bindActionCreators({ verify}, dispatch)
);

const mapStateToProps = (state: { contactVerify: State }): State => ( state.contactVerify );

export default connect(mapStateToProps, mapDispatchToProps)(ContactVerify);
