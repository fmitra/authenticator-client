import { h } from 'preact';
import { Header } from '@authenticator/ui/components';

interface Props {
  goBack: { (): void };
  lastMessageAddress: string;
}

const OTPSubheader = (props: Props): JSX.Element => (
  <div>
    <span class='subtitle'>Please enter the 6 digit code sent to</span>
    <div class='code-header__address'>
      <span>{props.lastMessageAddress} </span>
      <span class='code-header__back' onClick={props.goBack}>(not you?)</span>
    </div>
  </div>
);

const OTPHeader = (): JSX.Element => (
  <div>
    <span class='title'>We've sent a verification</span>
    <span class='title'>code your way!</span>
  </div>
);

const TOTPHeader = (): JSX.Element => (
  <div>
    <span class='title'>Almost there!</span>
  </div>
);

const TOTPSubheader = (): JSX.Element => (
  <div>
    <span class='subtitle'>Generate a new 6 digit verification code.</span>
  </div>
);

const CodeHeader = (props: Props): JSX.Element => (
  <Header
    title={
      props.lastMessageAddress ? <OTPHeader /> : <TOTPHeader />
    }
    subtitle={
      props.lastMessageAddress ? <OTPSubheader {...props} /> : <TOTPSubheader />
    }
  />
);

export default CodeHeader;
