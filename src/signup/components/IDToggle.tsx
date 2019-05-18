import { h } from 'preact';

import { INPUT_PHONE, INPUT_EMAIL } from '@authenticator/signup/constants';

interface Props {
  activeID: string;
  onClick: { (): void };
}

const IDToggle = (props: Props): JSX.Element => (
  <div onClick={props.onClick}>
    Sign up with {
      props.activeID === INPUT_PHONE
        ? INPUT_EMAIL
        : INPUT_PHONE
    } instead.
  </div>
);

export default IDToggle;
