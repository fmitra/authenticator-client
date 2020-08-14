import { h, ComponentChildren } from 'preact';
import { classes } from '@authenticator/ui';
import { DemoBar } from '@authenticator/ui/components';

interface Props {
  class?: string;
  withoutWrapper?: boolean;
  children: ComponentChildren;
};

const AppLayout = (props: Props): JSX.Element => (
  <DemoBar>
    <div class={classes({
      'container': true,
      [props.class || '']: Boolean(props.class),
    })}>
      {
        props.withoutWrapper ?
          props.children :
          <div class='container__item'>
            {props.children}
          </div>
      }
    </div>
  </DemoBar>
);

export default AppLayout;
