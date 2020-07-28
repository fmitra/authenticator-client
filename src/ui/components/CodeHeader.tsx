import { h } from 'preact';

import Token from '@authenticator/identity/Token';

interface Props {
  goBack: { (): void }
}

const CodeHeader = (props: Props): JSX.Element => (
  <div class='code-header'>
    <div class='code-header__content'>
      <div class='code-header__title'>
        <span>We've sent a verification</span>
        <span>code your way!</span>
      </div>
      <div class='code-header__subtitle'>
        <span>Please enter the 6 digit code sent to</span>
        <div class='code-header__address'>
          <span>{Token.lastMessageAddress} </span>
          <span class='code-header__back' onClick={props.goBack}>(not you?)</span>
        </div>
      </div>
    </div>
  </div>
);

export default CodeHeader;
