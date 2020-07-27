import { h } from 'preact';
import config from '@authenticator/config';

const TOS = (): JSX.Element => (
  <a href={config.links.termsOfService} target='_blank' rel='noopener noreferrer'>
    Terms of Service
  </a>
);

const PrivacyPolicy = (): JSX.Element => (
  <a href={config.links.privacyPolicy} target='_blank' rel='noopener noreferrer'>
    Privacy Policy
  </a>
);

const Disclaimer = (): JSX.Element => (
  <div class="signup-disclaimer">
    By signing up for an account, you are agreeing to our <br/>
    <TOS /> and <PrivacyPolicy />
  </div>
);

export default Disclaimer;
