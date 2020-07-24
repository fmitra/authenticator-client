import { h } from 'preact';

import { TFAOption } from '@authenticator/identity/Token';

interface Props {
  options: TFAOption[];
}

const TFAOptions = (props: Props): JSX.Element => (
  <div class='tfa-options'>
    { props.options.map(x => (
      <div class='tfa-options__option'>
        {x}
      </div>
    )) }
  </div>
);

export default TFAOptions;
