import { h, Component } from 'preact';

import { classes } from '@authenticator/ui';
import { NullAppError } from '@authenticator/errors';
import iconError from 'assets/icons/icon-error.svg';

interface Props {
  label?: string;
  placeholder?: string;
  type: string;
  class: string;
  validator?: { (v: string | number): NullAppError };
  onChange: { (ev: Event, err: NullAppError ): void };
  id: string;
}

interface State {
  error: NullAppError;
}

export default class Input extends Component<Props, State> {
  handleInput = (e: Event): void => {
    const { validator, onChange } = this.props;
    const { value } = (e.currentTarget as HTMLFormElement);

    if (!validator) {
      onChange(e, null);
      return;
    }

    const error = validator(value);
    this.setState({ error });

    onChange(e, error);
  }

  render(): JSX.Element {
    return (
      <div class={classes({
        'input': true,
        [this.props.class]: Boolean(this.props.class),
        'input--error': Boolean(this.state.error),
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
          type={this.props.type}
          onChange={this.handleInput}
        />

        {
          this.state.error &&
          <div class='input__error-message'>
            <img src={iconError} />
            {this.state.error.message}
          </div>
        }
      </div>
    );
  }
};
