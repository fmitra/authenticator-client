import { h, Component } from 'preact';

import { classes } from '@authenticator/ui';

interface Props {
  label: string;
  type: string;
  class: string;
  validator?: { (v: string | number): string };
  onChange: { (e: Event): void };
  id: string;
}

interface State {
  error: string;
}

const ErrorMessage = (props: { message: string }): JSX.Element => (
  <div class='input__error'>{props.message}</div>
);

export default class Input extends Component<Props, State> {
  handleInput = (e: Event): void => {
    const { validator, onChange } = this.props;
    const { value } = (e.currentTarget as HTMLFormElement);

    if (!validator) {
      onChange(e);
      return;
    }

    const errorMessage = validator(value);
    this.setState({ error: errorMessage });

    if (!errorMessage) {
      onChange(e);
    }
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

        { this.state.error && <ErrorMessage message={this.state.error} /> }

      </div>
    );
  }
};
