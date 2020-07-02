import { h } from 'preact';

import { PHONE, EMAIL } from '@authenticator/identity/contact';

interface Props {
  activeID: string;
  onClick: { (): void };
}

const IDToggle = (props: Props): JSX.Element => (
  <div onClick={props.onClick}>
    Sign up with {
      props.activeID === PHONE
        ? EMAIL
        : PHONE
    } instead.
  </div>
);

export default IDToggle;
