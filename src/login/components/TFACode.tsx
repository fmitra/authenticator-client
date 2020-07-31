import { h } from 'preact';

import { Button, InputCode } from '@authenticator/form';
import { NullAppError } from '@authenticator/errors';

interface Props {
  value: string;
  isDisabled: boolean;
  hasError: boolean;
  error: NullAppError;
  handleCode: { (code: string): void };
  handleChange: { (evt: Event, error: NullAppError): void };
  handleSubmit: { (): void };
}

const TFACode = (props: Props): JSX.Element => (
  <div class='login-code'>
    <InputCode
      id='tfa-code'
      value={props.value}
      error={props.error}
      onChange={props.handleChange}
      onInput={props.handleCode} />

    <Button
      name='Submit'
      hasError={props.hasError}
      class='button--wide'
      isDisabled={props.isDisabled}
      onClick={props.handleSubmit} />
  </div>
);

export default TFACode;
