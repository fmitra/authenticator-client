import { h } from 'preact';

interface Props {
  name: string;
  error: string;
  isDisabled: boolean;
  onClick: { (): void };
}

const Button = (props: Props): JSX.Element => (
  <button
    disabled={props.isDisabled || Boolean(props.error)}
    onClick={(e: Event): void => { e.preventDefault(); props.onClick(); }}>
    { props.name }
  </button>
);

export default Button;
