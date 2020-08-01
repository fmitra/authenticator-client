import { h, ComponentChildren } from 'preact';
import { classes } from '@authenticator/ui';

interface Props {
  class?: string;
  children?: ComponentChildren;
  title: ComponentChildren;
  subtitle?: ComponentChildren;
}

const Header = (props: Props): JSX.Element => (
  <div class={classes({
    'header': true,
    [props.class || '']: Boolean(props.class),
  })}>
    <div class='header__content'>
      <div class='header__title'>
        {props.title}
      </div>
      { props.subtitle && <div class='header__subtitle'>
        {props.subtitle}
      </div> }
      {props.children && props.children}
    </div>
  </div>
);

export default Header;
