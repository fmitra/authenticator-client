import { h } from 'preact';
import { Header } from '@authenticator/ui/components';

const ContactHeader = (): JSX.Element => (
  <Header
    title={
      <span class='title'>Add Address</span>
    }
    subtitle={
      <span class='subtitle'>Add your new phone number or email address below</span>
    }
  />
);

export default ContactHeader;
