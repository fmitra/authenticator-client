import { h } from 'preact';
import { Link } from 'preact-router/match';

import routes from '@authenticator/app/routes';

const SignupInstead = (): JSX.Element => (
  <div class='login-signup'>
    <span>Don't have an account? </span>
    <Link activeClassName='active' href={routes.SIGNUP}>Create one</Link>
  </div>
);

export default SignupInstead;
