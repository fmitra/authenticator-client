import { h } from 'preact';
import { Success } from '@authenticator/ui/components';

const TOTPSuccess = (): JSX.Element => {
  return (
    <Success>
      <span>You've enabled TOTP</span>
    </Success>
  );
};

export default TOTPSuccess;
