import { h, Component } from 'preact';

import { Button } from '@authenticator/form';
import { NullAppError, Errors, FormErrors } from '@authenticator/errors';
import { TOTPRequest } from '@authenticator/requests';
import { TOTPHeader, QR, FormFields } from '@authenticator/totp/components';
import { Disclaimer } from '@authenticator/ui/components';

interface State {
  errors: FormErrors;
  code: string;
}

interface Props {
  error: NullAppError;
  totp: string;
  secret: { (): any };
  enable: { (data: TOTPRequest): any };
  isRequesting: boolean;
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
    isRequesting: false,
  }

  componentWillReceiveProps(props: Props, state: State): void {
    this.setState({
      errors: this.state.errors.update(props.error, 'request'),
    });
  }

  handleCode = (code: string, error: NullAppError): void => {
    this.state.errors.update(null, 'request');
    this.state.errors.update(error, 'code');

    this.setState({
      code: code,
      errors: this.state.errors,
    });
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
        <form class='totp-form'>
          <TOTPHeader />

          { !this.props.totp && <Button
            name='Show QR Code'
            class='totp-btn'
            hasError={this.state.errors.notOk}
            isDisabled={this.props.isRequesting}
            onClick={this.handleSecret} /> }

          {
            !this.props.totp &&
            this.state.errors.get('request') &&
            <Errors class='totp__errors' errors={this.state.errors} />
          }

          { this.props.totp && <QR value={this.props.totp} /> }

          { this.props.totp && <FormFields
            errors={this.state.errors}
            value={this.state.code}
            error={
              this.state.errors.get('code') ||
              this.state.errors.get('request')
            }
            isDisabled={this.props.isRequesting}
            handleSubmit={this.handleSubmit}
            handleCode={this.handleCode} /> }

          <Disclaimer />
        </form>
      </div>
    );
  }
};
