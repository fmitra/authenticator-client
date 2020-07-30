import { h } from 'preact';
import { classes } from '@authenticator/ui';

interface Props {
  class?: string;
  name: string;
  hasError: boolean;
  isDisabled: boolean;
  onClick: { (): void };
}

const Button = (props: Props): JSX.Element => (
  <div class={classes({
    'button': true,
    [props.class || '']: Boolean(props.class),
  })}>
    <button
      class='button__button'
      disabled={props.isDisabled || props.hasError}
      onClick={(e: Event): void => { e.preventDefault(); props.onClick(); }}>
      { props.name }
    </button>
  </div>
);

export default Button;
