import { h } from 'preact';
import { Header } from '@authenticator/ui/components';

const TOTPHeader = (): JSX.Element => (
  <Header
    title={
      <span class='title'>Disable TOTP</span>
    }
    subtitle={
      <span>To disable TOTP, enter your code below</span>
    }
  />
);

export default TOTPHeader;
