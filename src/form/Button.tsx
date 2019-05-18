import { h } from 'preact';

interface Props {
  name: string;
  onClick: { (): void };
}

const Button = (props: Props): JSX.Element => (
  <button onClick={(e: Event): void => { e.preventDefault(); props.onClick(); }}>
    { props.name }
  </button>
);

export default Button;
