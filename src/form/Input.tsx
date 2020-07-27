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
  onChange: { (ev: Event, err: NullAppError ): void };
  error?: NullAppError;
  id: string;
}

export default class Input extends Component<Props, {}> {
  handleInput = (e: Event): void => {
    const { validator, onChange } = this.props;
    const { value } = (e.currentTarget as HTMLFormElement);

    if (!validator) {
      onChange(e, null);
      return;
    }

    const error = validator(value);

    onChange(e, error);
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
          onChange={this.handleInput}
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
