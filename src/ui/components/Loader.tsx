import { h } from 'preact';

import { classes } from '@authenticator/ui';

interface Props {
  class?: string;
}

const Loader = (props: Props): JSX.Element => (
  <div class={classes({
    'loader': true,
    [props.class || '']: Boolean(props.class),
  })}>
    <div class='loader__bounce-1'></div>
    <div class='loader__bounce-2'></div>
    <div class='loader__bounce-3'></div>
  </div>
);

export default Loader;
