import { h } from 'preact';
import { Success } from '@authenticator/ui/components';

const ContactSuccess = (): JSX.Element => {
  return (
    <Success>
      <span>You've updated your contact details</span>
    </Success>
  );
};

export default ContactSuccess;
