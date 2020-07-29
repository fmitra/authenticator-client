import { h } from 'preact';

const ContactHeader = (): JSX.Element => (
  <div class='login-header'>
    <div class='login-header__content'>
      <div class='login-header__title'>
        <span>Add Address</span>
      </div>
    </div>
    <div class='login-header__subtitle'>
      <span>Add your new phone number or email address below</span>
    </div>
  </div>
);

export default ContactHeader;
