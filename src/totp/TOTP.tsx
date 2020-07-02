import { h, Component } from 'preact';

import { Button } from '@authenticator/form';
import { NullAppError, Errors, FormErrors } from '@authenticator/errors';
import { TOTPRequest } from '@authenticator/requests';
import FormFields from '@authenticator/totp/components/FormFields';

interface State {
  errors: FormErrors;
  code: string;
}

interface Props {
  path?: string;
  error: NullAppError;
  totp: string;
  secret: { (): any };
  enable: { (data: TOTPRequest): any };
  isRequesting: boolean;
  isEnabled: boolean;
}

export default class TOTP extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      code: '',
      errors: new FormErrors(),
    }
  }

  static defaultProps = {
    error: null,
    secret: (): void => {},
    enable: (data: TOTPRequest): void => {},
    isEnabled: false,
    isRequesting: false,
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
    this.props.enable({ code: this.state.code });
  }

  handleSecret = (): void => {
    this.props.secret();
  }

  render(): JSX.Element {
    return (
      <div class='totp'>
        TOTP
        <form class='totp-form'>
          <Errors class='totp__errors' errors={this.state.errors} />

          { !this.props.totp && <Button
            name='Show QR Code'
            hasError={this.state.errors.notOk}
            isDisabled={this.props.isRequesting}
            onClick={this.handleSecret} /> }

          { this.props.totp && this.props.totp }

          { this.props.totp && <FormFields
            errors={this.state.errors}
            isDisabled={this.props.isRequesting}
            handleSubmit={this.handleSubmit}
            handleCode={this.handleCode} /> }
        </form>
      </div>
    );
  }
};
