import { h, Component } from 'preact';

import { InputCode, Button } from '@authenticator/form';
import { VerifyContactRequest } from '@authenticator/requests';
import { NullAppError, FormErrors } from '@authenticator/errors';
import { Disclaimer, CodeHeader } from '@authenticator/ui/components';
import Token from '@authenticator/identity/Token';

interface Props {
  error: NullAppError;
  verify: { (data: VerifyContactRequest): any };
  restartFlow: { (): any };
  isRequesting: boolean;
}

interface State {
  code: string;
  errors: FormErrors;
}

export default class ContactVerify extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      code: '',
      errors: new FormErrors(),
    }
  }

  static defaultProps = {
    error: null,
    verify: (data: VerifyContactRequest): void => {},
    restartFlow: (): void => {},
    isRequesting: false,
  };

  componentWillReceiveProps(props: Props, state: State): void {
    this.setState({ errors: this.state.errors.update(props.error, 'request') });
  }

  handleCode = (code: string, error: NullAppError): void => {
    this.state.errors.update(error, 'code');
    this.state.errors.update(null, 'request');

    this.setState({
      code: code,
      errors: this.state.errors,
    });
  }

  handleSubmit = (): void => {
    this.props.verify({
      isDisabled: false,
      code: this.state.code,
    });
  }

  render(): JSX.Element {
    return (
      <div class='contact'>
        <form class='contact-form'>
          <CodeHeader
            lastMessageAddress={Token.lastMessageAddress}
            goBack={this.props.restartFlow} />

          <InputCode
            class='contact-verify-input'
            value={this.state.code}
            error={
              this.state.errors.get('code') ||
              this.state.errors.get('request')
            }
            id='contact-verify-code'
            onChange={this.handleCode} />

          <Button
            class='contact-btn'
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
