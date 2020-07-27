import { h } from 'preact';
import { Link } from 'preact-router/match';

import routes from '@authenticator/app/routes';

const LoginInstead = (): JSX.Element => (
  <div class='signup-login'>
    <div class='signup-login__divider'>
      <span>Or</span>
    </div>
    <span>Already have an account?</span>
    <Link activeClassName='active' href={routes.LOGIN}>Login</Link>
  </div>
);

export default LoginInstead;
