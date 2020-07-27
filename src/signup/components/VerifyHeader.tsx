import { h } from 'preact';
import Token from '@authenticator/identity/Token';

interface Props {
  goBack: { (): void }
}

const VerifyHeader = (props: Props): JSX.Element => (
  <div class='signup-header'>
    <div class='signup-header__content'>
      <div class='signup-header__title'>
        <span>We've sent a verification</span>
        <span>code your way!</span>
      </div>
      <div class='signup-header__subtitle'>
        <span>Please enter the 6 digit code sent to</span>
        <div class='signup-header__address'>
          <span>{Token.lastMessageAddress} </span>
          <span class='signup-header__back' onClick={props.goBack}>(not you?)</span>
        </div>
      </div>
    </div>
  </div>
);

export default VerifyHeader;
