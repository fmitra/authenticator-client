import { h } from 'preact';

import { classes } from '@authenticator/ui';
import FormErrors from '@authenticator/errors/FormErrors';

const ErrorMessage = (props: { error: string; }): JSX.Element => (
  <span class='error__message'>{props.error}</span>
);

const Errors = (props: { errors: FormErrors; class: string; }): JSX.Element => (
  <div class={classes({
      'error': true,
      [props.class]: Boolean(props.class),
    })}>
    {
      Object.keys(props.errors.errors).map(k => (
        <ErrorMessage error={props.errors.errors[k].message} />
      ))
    }
  </div>
);

export default Errors;
