import { h } from 'preact';
import { Header } from '@authenticator/ui/components';

interface Props {
  totp: string;
}

const TOTPHeader = (props: Props): JSX.Element => (
  <Header
    title={
      <span class='title'>Enable TOTP</span>
    }
    subtitle={
      <div>
        { !props.totp && <span class='subtitle'>Click below to generate a QR code</span> }
        <span class='subtitle'>Scan and enter your code to enable TOTP</span>
      </div>
    }
  />
);

export default TOTPHeader;
