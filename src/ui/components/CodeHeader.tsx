import { h } from 'preact';

interface Props {
  goBack: { (): void };
  lastMessageAddress: string;
}

const OTPSubheader = (props: Props): JSX.Element => (
  <div class='code-header__subtitle'>
    <span>Please enter the 6 digit code sent to</span>
    <div class='code-header__address'>
      <span>{props.lastMessageAddress} </span>
      <span class='code-header__back' onClick={props.goBack}>(not you?)</span>
    </div>
  </div>
);

const OTPHeader = (): JSX.Element => (
  <div class='code-header__title'>
    <span>We've sent a verification</span>
    <span>code your way!</span>
  </div>
);

const TOTPHeader = (): JSX.Element => (
  <div class='code-header__title'>
    <span>Almost there!</span>
  </div>
);

const TOTPSubheader = (): JSX.Element => (
  <div class='code-header__subtitle'>
    <span>Generate a new 6 digit verification code.</span>
  </div>
);

const CodeHeader = (props: Props): JSX.Element => (
  <div class='code-header'>
    <div class='code-header__content'>
      { props.lastMessageAddress ? <OTPHeader /> : <TOTPHeader /> }
      { props.lastMessageAddress ? <OTPSubheader {...props} /> : <TOTPSubheader /> }
    </div>
  </div>
);

export default CodeHeader;
