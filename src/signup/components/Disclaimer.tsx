import { h } from 'preact';

import { TOS, PrivacyPolicy } from '@authenticator/ui/components/Disclaimer';

const Disclaimer = (): JSX.Element => (
  <div class="signup-disclaimer">
    By signing up for an account, you are agreeing to our <br/>
    <TOS /> and <PrivacyPolicy />
  </div>
);

export default Disclaimer;
