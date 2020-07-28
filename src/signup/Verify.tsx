import { h, Component } from 'preact';

import { InputCode, Button } from '@authenticator/form';
import { VerifyCodeRequest } from '@authenticator/requests';
import { NullAppError, FormErrors } from '@authenticator/errors';
import { Disclaimer } from '@authenticator/signup/components';
import { CodeHeader } from '@authenticator/ui/components';

interface Props {
  error: NullAppError;
  verify: { (data: VerifyCodeRequest): any };
  restartFlow: { (): any };
  isRequesting: boolean;
}

interface State {
  code: string;
  errors: FormErrors;
}

export default class Verify extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      code: '',
      errors: new FormErrors(),
    }
  }

  static defaultProps = {
    error: null,
    verify: (data: VerifyCodeRequest): void => {},
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
      code: this.state.code,
    });
  }

  render(): JSX.Element {
    return (
      <div class='signup'>
        <form class='signup-form'>
          <CodeHeader goBack={this.props.restartFlow} />

          <InputCode
            class='signup-verify-input'
            value={this.state.code}
            error={this.state.errors.get('code')}
            id='signup-verify-code'
            onChange={this.handleCode} />

          <Button
            name='Submit'
            class='signup-btn'
            hasError={this.state.errors.notOk}
            isDisabled={this.props.isRequesting}
            onClick={this.handleSubmit} />

          <Disclaimer />
        </form>
      </div>
    );
  }
};
