import { h } from 'preact';

const ContactHeader = (): JSX.Element => (
  <div class='contact-header'>
    <div class='contact-header__content'>
      <div class='contact-header__title'>
        <span>Add Address</span>
      </div>
    </div>
    <div class='contact-header__subtitle'>
      <span>Add your new phone number or email address below</span>
    </div>
  </div>
);

export default ContactHeader;
