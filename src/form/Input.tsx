import { h } from 'preact';

import { classes } from '@authenticator/ui';

interface Props {
  label: string;
  type: string;
  error: string;
  class: string;
  id: string;
}

const Input = (props: Props): JSX.Element => (
  <div class={classes({
    "input": true,
    [props.class]: Boolean(props.class),
  })}>

    <label for={props.id} class="input__label">{props.label}</label>
    <input id={props.id} class="input__input" type={props.type} />

    { props.error && <ErrorMessage message={props.error} /> }

  </div>
);

const ErrorMessage = (props: { message: string }): JSX.Element => (
  <div class="input__error">{props.message}</div>
);

export default Input;
