import { h } from 'preact';

import { InputCode, Button } from '@authenticator/form';
import { NullAppError, FormErrors } from '@authenticator/errors';

interface Props {
  handleCode: { (code: string): void };
  handleChange: { (evt: Event, error: NullAppError): void };
  handleSubmit: { (): void };
  errors: FormErrors;
  error: NullAppError;
  value: string;
  isDisabled: boolean;
}

const FormFields = (props: Props): JSX.Element => (
  <div class='totp__fields'>
    <InputCode
      error={props.error}
      value={props.value}
      id='totp-code'
      onChange={props.handleChange}
      onInput={props.handleCode} />
    <Button
      name='Submit'
      class='button--wide'
      isDisabled={props.isDisabled}
      hasError={props.errors.notOk}
      onClick={props.handleSubmit} />
  </div>
);

export default FormFields;
