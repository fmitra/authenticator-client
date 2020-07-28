import { h } from 'preact';

import { Button } from '@authenticator/form';
import { Loader } from '@authenticator/ui/components';
import iconFingerprint from 'assets/icons/icon-fingerprint.svg';

interface Props {
  verifyDevice: { (credentialsAPI: CredentialsContainer): any };
  isRequesting: boolean;
}

const TFADevice = (props: Props): JSX.Element => {
  return (
    <div class='login-tfa-device'>
      <div class='device__icon'>
        <img src={iconFingerprint} />
      </div>
      <div class='login-tfa-device__intro'>
        Connect your FIDO device and click to button below to 
        complete your login.
      </div>
      {
        !props.isRequesting ?
        <Button
          name='Ready'
          class='login-tfa-device-button'
          hasError={false}
          isDisabled={props.isRequesting}
          onClick={() => props.verifyDevice(window.navigator.credentials)} /> :
        <Loader class='login-tfa-loader' />
      }
    </div>
  );
};

export default TFADevice;
