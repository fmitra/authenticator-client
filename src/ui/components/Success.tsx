import { h, ComponentChildren } from 'preact';
import { classes } from '@authenticator/ui';
import iconSuccess from 'assets/icons/icon-success.svg';

interface Props {
  class?: string;
  children: ComponentChildren;
}

const Success = (props: Props): JSX.Element => {
  return (
    <div class={classes({
      'container': true,
      [props.class || '']: Boolean(props.class),
    })}>
      <div class='success'>
        <img src={iconSuccess} />
        {props.children}
      </div>
    </div>
  );
};

export default Success;
