import { h } from 'preact';
import { AppLayout, Success } from '@authenticator/ui/components';

const LoginSuccess = (): JSX.Element => {
  return (
    <AppLayout class='container--graphic' withoutWrapper={true}>
      <Success>
        <span>You're logged in!</span>
      </Success>
    </AppLayout>
  );
};

export default LoginSuccess;
