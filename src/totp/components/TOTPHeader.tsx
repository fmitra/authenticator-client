import { h } from 'preact';

const TOTPHeader = (): JSX.Element => (
  <div class='totp-header'>
    <div class='totp-header__content'>
      <div class='totp-header__title'>
        <span>Enble TOTP</span>
      </div>
    </div>
    <div class='totp-header__subtitle'>
      <span>Click below to generate a QR code</span>
      <span>Scan your and enter your code to enable TOTP</span>
    </div>
  </div>
);

export default TOTPHeader;
