import { h, ComponentChildren } from 'preact';
import { classes } from '@authenticator/ui';

interface Props {
  class?: string;
  children: ComponentChildren;
};

const AppLayout = (props: Props): JSX.Element => (
  <div class={classes({
    'container': true,
    [props.class || '']: Boolean(props.class),
  })}>
    <div class='container__item'>
      {props.children}
    </div>
  </div>
);

export default AppLayout;
