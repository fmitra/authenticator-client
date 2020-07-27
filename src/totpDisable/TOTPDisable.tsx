import { h, Component } from 'preact';

import { Input, Button } from '@authenticator/form';
import { NullAppError, Errors, FormErrors } from '@authenticator/errors';
import { TOTPRequest } from '@authenticator/requests';

interface State {
  errors: FormErrors;
  code: string;
}

interface Props {
  path?: string;
  error: NullAppError;
  disable: { (data: TOTPRequest): any };
  isRequesting: boolean;
  isDisabled: boolean;
}

export default class TOTPDisable extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      errors: new FormErrors(),
      code: '',
    }
  }

  static defaultProps = {
    error: null,
    disable: (data: TOTPRequest): void => {},
    isRequesting: false,
    isDisabled: false,
  }

  componentWillReceiveProps(props: Props, state: State): void {
    this.setState({
      errors: this.state.errors.update(props.error, 'request'),
    });
  }

  handleCode = (e: Event): void => {
    const { value } = (e.currentTarget as HTMLFormElement);
    this.setState({ code: value });
  }

  handleSubmit = (): void => {
    this.props.disable({ code: this.state.code });
  }

  render(): JSX.Element {
    return (
      <div class='totp-disable'>
        TOTP Disable
        <form class='totp-disable-form'>
          <Errors class='totp__errors' errors={this.state.errors} />

          <Input
            class='totp-disable__input'
            value={this.state.code}
            label='Code'
            type='string'
            id='totp-disable-code'
            onChange={this.handleCode} />
          <Button
            class='totp-button'
            name='Submit'
            hasError={this.state.errors.notOk}
            isDisabled={this.props.isRequesting}
            onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
};
