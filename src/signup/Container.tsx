import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import { Dispatch } from 'redux';

import { NullAppError } from '@authenticator/errors';
import { verify, register, SignupThunk } from '@authenticator/signup/actions';
import { State } from '@authenticator/signup/reducer';
import { VerifyCodeRequest, SignupRequest } from '@authenticator/requests';
import Signup from '@authenticator/signup/Signup';
import Verify from '@authenticator/signup/Verify';
import Success from '@authenticator/signup/Success';

const mapDispatchToProps = (dispatch: Dispatch): {
  register: { (data: SignupRequest): SignupThunk };
  verify: { (data: VerifyCodeRequest): SignupThunk };
} => (
  bindActionCreators({ register, verify }, dispatch)
);

const mapStateToProps = (state: { signup: State }): State => ( state.signup );

interface Props {
  path?: string;
  error: NullAppError;
  register: { (data: SignupRequest): any };
  verify: { (data: VerifyCodeRequest): any };
  isRequesting: boolean;
  needAccountDetails: boolean;
  needVerification: boolean;
}

class Container extends Component<Props, {}> {
  render(): JSX.Element {
    if (this.props.needAccountDetails) {
      return (
        <Signup
          error={this.props.error}
          register={this.props.register}
          isRequesting={this.props.isRequesting} />
      );
    }

    if (this.props.needVerification) {
      return (
        <Verify
          error={this.props.error}
          verify={this.props.verify}
          isRequesting={this.props.isRequesting} />
      );
    }

    return (
      <Success />
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
