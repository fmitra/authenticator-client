import { h } from 'preact';
import { Header } from '@authenticator/ui/components';

const LoginHeader = (): JSX.Element => (
  <Header
    class='header--login'
    title={
      <span class='title'>Login</span>
    }
    subtitle={
      <span class='subtitle'>Login with either an email address or phone number.</span>
    }
  />
);

export default LoginHeader;
