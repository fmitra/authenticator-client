import { h } from 'preact';
import { AppLayout, Success } from '@authenticator/ui/components';

const ContactSuccess = (): JSX.Element => {
  return (
    <AppLayout class='container--graphic' withoutWrapper={true}>
      <Success>
        <span>You've updated your contact details</span>
      </Success>
    </AppLayout>
  );
};

export default ContactSuccess;
