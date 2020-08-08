import { h } from 'preact';
import { AppLayout, Success } from '@authenticator/ui/components';

const DeviceSuccess = (): JSX.Element => {
  return (
    <AppLayout class='container--graphic' withoutWrapper={true}>
      <Success>
        <span>Device registered</span>
      </Success>
    </AppLayout>
  );
};

export default DeviceSuccess;
