import { h } from 'preact';
import { AppLayout, Success } from '@authenticator/ui/components';

const SignupSuccess = (): JSX.Element => {
  return (
    <AppLayout class='container--graphic' withoutWrapper={true}>
      <Success>
        <span>Account created</span>
      </Success>
    </AppLayout>
  );
};

export default SignupSuccess;
