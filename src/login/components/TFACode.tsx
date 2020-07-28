import { h } from 'preact';

import { Button, InputCode } from '@authenticator/form';
import { NullAppError } from '@authenticator/errors';

interface Props {
  value: string;
  isDisabled: boolean;
  hasError: boolean;
  error: NullAppError;
  handleCode: { (code: string, error: NullAppError): void };
  handleSubmit: { (): void };
}

const TFACode = (props: Props): JSX.Element => (
  <div class='tfa-code'>
    <InputCode
      class='tfa-code__input'
      id='tfa-code'
      value={props.value}
      error={props.error}
      onChange={props.handleCode} />

    <Button
      name='Submit'
      hasError={props.hasError}
      class='tfa-button'
      isDisabled={props.isDisabled}
      onClick={props.handleSubmit} />
  </div>
);

export default TFACode;
