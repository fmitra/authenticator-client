import { h } from 'preact';

import { classes } from '@authenticator/ui';
import FormErrors from '@authenticator/errors/FormErrors';
import iconError from 'assets/icons/icon-error.svg';

interface Props {
  errors: FormErrors;
  class?: string;
}

const ErrorMessage = (props: { error: string; key: string }): JSX.Element => (
  <div class='error__message'>
    <img src={iconError} />
    {props.error}
  </div>
);

const Errors = (props: Props): JSX.Element => (
  <div class={classes({
    'error': true,
    [props.class || '']: Boolean(props.class),
  })}>
    {
      Object.keys(props.errors.errors).map((k): JSX.Element => (
        <ErrorMessage
          key={k}
          error={props.errors.errors[k].message}
        />
      ))
    }
  </div>
);

export default Errors;
