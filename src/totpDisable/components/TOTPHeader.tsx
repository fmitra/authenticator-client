import { h } from 'preact';

const TOTPHeader = (): JSX.Element => (
  <div class='totp-header'>
    <div class='totp-header__content'>
      <div class='totp-header__title'>
        <span>Disable TOTP</span>
      </div>
    </div>
    <div class='totp-header__subtitle'>
      <span>To disable TOTP, enter your code below</span>
    </div>
  </div>
);

export default TOTPHeader;
