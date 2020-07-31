import { h } from 'preact';
import { Header } from '@authenticator/ui/components';

const LoginHeader = (): JSX.Element => (
  <Header
    class='header--login'
    title={
      <span class='title'>Login</span>
    }
    subtitle={
      <span class='subtitle'>It's so good it doesn't even need a headline.</span>
    }
  />
);

export default LoginHeader;
