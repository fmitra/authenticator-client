import { h } from 'preact';

import { Loader } from '@authenticator/ui/components';

interface Props {
  verifyDevice: { (credentialsAPI: CredentialsContainer): any };
}

const TFADevice = (props: Props): JSX.Element => {
  props.verifyDevice(window.navigator.credentials);

  return (
    <div class='tfa-device'>
      <Loader />
      Please Insert your device
    </div>
  );
};

export default TFADevice;
