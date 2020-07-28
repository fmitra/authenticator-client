import { h } from 'preact';

import { Loader } from '@authenticator/ui/components';

interface Props {
  verifyDevice: { (credentialsAPI: CredentialsContainer): any };
}

const TFADevice = (props: Props): JSX.Element => {
  props.verifyDevice(window.navigator.credentials);

  return (
    <div class='login-tfa-device'>
      <Loader />
      <span>Please Insert your device</span>
    </div>
  );
};

export default TFADevice;
