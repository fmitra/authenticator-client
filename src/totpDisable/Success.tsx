import { h } from 'preact';
import { Success } from '@authenticator/ui/components';

const TOTPSuccess = (): JSX.Element => {
  return (
    <Success>
      <span>You've disabled TOTP</span>
    </Success>
  );
};

export default TOTPSuccess;
