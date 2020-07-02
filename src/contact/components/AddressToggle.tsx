import { h } from 'preact';

import { PHONE, EMAIL } from '@authenticator/identity/contact';

interface Props {
  activeID: string;
  onClick: { (): void };
}

const AddressToggle = (props: Props): JSX.Element => (
  <div onClick={props.onClick}>
    Register new {
      props.activeID === PHONE
        ? EMAIL
        : PHONE
    } instead.
  </div>
);

export default AddressToggle;
