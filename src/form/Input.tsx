import { h, Component } from 'preact';

import { classes } from '@authenticator/ui';
import { NullAppError } from '@authenticator/errors';
import iconError from 'assets/icons/icon-error.svg';

interface Props {
  label?: string;
  placeholder?: string;
  type: string;
  value: string;
  class: string;
  validator?: { (v: string | number): NullAppError };
  onChange: { (evt: Event, err: NullAppError ): void };
  onInput?: { (evt: Event): void };
  error?: NullAppError;
  id: string;
}

export default class Input extends Component<Props, {}> {
  handleChange = (evt: Event): void => {
    const { validator, onChange } = this.props;
    const { value } = (evt.currentTarget as HTMLFormElement);

    if (!validator) {
      onChange(evt, null);
      return;
    }

    const error = validator(value);

    onChange(evt, error);
  }

  handleInput = (evt: Event): void => {
    const { onInput } = this.props;

    if (onInput) {
      onInput(evt);
    }
  }

  render(): JSX.Element {
    return (
      <div class={classes({
        'input': true,
        [this.props.class]: Boolean(this.props.class),
        'input--error': Boolean(this.props.error),
      })}>

        {
          this.props.label &&
          <label for={this.props.id} class='input__label'>
            {this.props.label}
          </label>
        }

        <input
          id={this.props.id}
          class='input__input'
          placeholder={this.props.placeholder || ''}
          value={this.props.value}
          type={this.props.type}
          onChange={this.handleChange}
          onInput={this.handleInput}
        />

        {
          this.props.error &&
          <div class='input__error-message'>
            <img src={iconError} />
            {this.props.error.message}
          </div>
        }
      </div>
    );
  }
};
