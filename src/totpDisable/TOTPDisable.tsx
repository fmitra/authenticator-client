import { h, Component } from 'preact';

import { InputCode, Button } from '@authenticator/form';
import { NullAppError, FormErrors } from '@authenticator/errors';
import { TOTPRequest } from '@authenticator/requests';
import { TOTPHeader } from '@authenticator/totpDisable/components';
import { Disclaimer } from '@authenticator/ui/components';

interface State {
  errors: FormErrors;
  code: string;
}

interface Props {
  error: NullAppError;
  disable: { (data: TOTPRequest): any };
  isRequesting: boolean;
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

  handleCode = (code: string, error: NullAppError): void => {
    this.state.errors.update(null, 'request');
    this.state.errors.update(error, 'code');

    this.setState({
      code: code,
      errors: this.state.errors,
    });
  }

  handleSubmit = (): void => {
    this.props.disable({ code: this.state.code });
  }

  render(): JSX.Element {
    return (
      <div class='totp'>
        <form class='totp-form'>
          <TOTPHeader />
          <InputCode
            class='totp__input'
            value={this.state.code}
            id='totp-disable-code'
            error={
              this.state.errors.get('code') ||
              this.state.errors.get('request')
            }
            onChange={this.handleCode} />
          <Button
            class='totp-btn'
            name='Submit'
            hasError={this.state.errors.notOk}
            isDisabled={this.props.isRequesting}
            onClick={this.handleSubmit} />

          <Disclaimer />
        </form>
      </div>
    );
  }
};
