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
    <div class='login-device'>
      <div class='login-device__icon'>
        <img src={iconFingerprint} />
      </div>
      <div class='login-device__intro'>
        Connect your FIDO device and click the button below to 
        complete your login.
      </div>
      {
        !props.isRequesting ?
          <Button
            name='Ready'
            hasError={false}
            isDisabled={props.isRequesting}
            onClick={(): { (x: CredentialsContainer): any } =>
              props.verifyDevice(window.navigator.credentials)
            } /> :
          <Loader class='loader--login' />
      }
    </div>
  );
};

export default TFADevice;
