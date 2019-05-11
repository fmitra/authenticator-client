import { h } from 'preact';

import { Input } from '@authenticator/form';

interface Props {
  path: string;
}

const Signup = (props: Props): JSX.Element => {
  return (
    <div class="signup">
      <form class="signup-form">

        <Input
          class="signup-input"
          label="Password"
          type="password"
          id="signup-password"
          error="Password is too short" />

        <Input
          class="signup-input"
          label="Username"
          type="text"
          id="signup-username"
          error="Username is not valid" />

      </form>
    </div>
  );
};

export default Signup;
