import { h, Component } from 'preact';

import { classes } from '@authenticator/ui';
import { NullAppError } from '@authenticator/errors';

interface Props {
  label: string;
  type: string;
  class: string;
  validator?: { (v: string | number): NullAppError };
  onChange: { (ev: Event, err: NullAppError ): void };
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
      })}>

        <label for={this.props.id} class='input__label'>
          {this.props.label}
        </label>

        <input
          id={this.props.id}
          class='input__input'
          type={this.props.type}
          onChange={this.handleInput}
        />

      </div>
    );
  }
};
