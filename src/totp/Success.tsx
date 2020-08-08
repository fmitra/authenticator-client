import { h } from 'preact';
import { AppLayout, Success } from '@authenticator/ui/components';

const TOTPSuccess = (): JSX.Element => {
  return (
    <AppLayout class='container--graphic' withoutWrapper={true}>
      <Success>
        <span>You've enabled TOTP</span>
      </Success>
    </AppLayout>
  );
};

export default TOTPSuccess;
