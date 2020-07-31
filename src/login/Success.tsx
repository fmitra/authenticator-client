import { h } from 'preact';
import { Success } from '@authenticator/ui/components';

const LoginSuccess = (): JSX.Element => {
  return (
    <Success>
      <span>You're logged in!</span>
    </Success>
  );
};

export default LoginSuccess;
