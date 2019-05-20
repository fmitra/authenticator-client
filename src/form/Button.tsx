import { h } from 'preact';

interface Props {
  name: string;
  hasError: boolean;
  isDisabled: boolean;
  onClick: { (): void };
}

const Button = (props: Props): JSX.Element => (
  <button
    disabled={props.isDisabled || props.hasError}
    onClick={(e: Event): void => { e.preventDefault(); props.onClick(); }}>
    { props.name }
  </button>
);

export default Button;
