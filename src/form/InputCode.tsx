import { h, Component } from 'preact';

import { Input } from '@authenticator/form';
import { NullAppError } from '@authenticator/errors';

interface Props {
  class: string;
  id: string;
  label?: string;
  error: NullAppError;
  value: string;
  placeholder?: string;
  onChange: { (code: string, error: NullAppError): void };
}

const validateCode = (input: string | number): NullAppError => {
  const minCodeLen = 6;
  if (String(input).length < minCodeLen) {
    return {
      message: `Code should be at least ${minCodeLen} characters long`,
      code: 'invalid_code',
    }
  }

  return null;
};

export default class InputCode extends Component<Props, {}> {
  handleCode = (e: Event, error: NullAppError): void => {
    const { value } = (e.currentTarget as HTMLFormElement);
    const { onChange } = this.props;

    onChange(value.trim(), error);
  }

  render(): JSX.Element {
    return (
      <Input
        class={this.props.class}
        label={this.props.label}
        value={this.props.value}
        error={this.props.error}
        placeholder={this.props.placeholder || 'Enter 6 digit verification code'}
        type='number'
        id={this.props.id}
        onChange={this.handleCode}
        validator={validateCode} />
    );
  }
};
