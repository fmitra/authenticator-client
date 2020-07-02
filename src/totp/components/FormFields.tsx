import { h } from 'preact';

import { Input, Button } from '@authenticator/form';
import { FormErrors } from '@authenticator/errors';

interface Props {
  handleCode: { (e: Event): void };
  handleSubmit: { (): void };
  errors: FormErrors;
  isDisabled: boolean;
}

const FormFields = (props: Props): JSX.Element => (
  <div class='totp__fields'>
    <Input
      class='totp__input'
      label='Code'
      type='string'
      id='totp-code'
      onChange={props.handleCode} />
    <Button
      name='Submit'
      isDisabled={props.isDisabled}
      hasError={props.errors.notOk}
      onClick={props.handleSubmit} />
  </div>
);

export default FormFields;
