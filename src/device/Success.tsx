import { h } from 'preact';
import { AppLayout, Success } from '@authenticator/ui/components';

const DeviceSuccess = (): JSX.Element => {
  return (
    <AppLayout withoutWrapper={true}>
      <Success>
        <span>Device registerd</span>
      </Success>
    </AppLayout>
  );
};

export default DeviceSuccess;
