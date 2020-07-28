import { h } from 'preact';
import config from '@authenticator/config';
import { classes } from '@authenticator/ui';

interface Props {
  class?: string;
};

export const TOS = (): JSX.Element => (
  <a href={config.links.termsOfService} target='_blank' rel='noopener noreferrer'>
    Terms of Service
  </a>
);

export const PrivacyPolicy = (): JSX.Element => (
  <a href={config.links.privacyPolicy} target='_blank' rel='noopener noreferrer'>
    Privacy Policy
  </a>
);

const Disclaimer = (props: Props): JSX.Element => (
  <div class={classes({
    'disclaimer': true,
    [props.class || '']: Boolean(props.class),
  })}>
    <TOS /> and <PrivacyPolicy />
  </div>
);

export default Disclaimer;
