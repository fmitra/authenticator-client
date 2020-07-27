import { h, Component } from 'preact';

import { Input, Button } from '@authenticator/form';
import { VerifyCodeRequest } from '@authenticator/requests';
import { NullAppError, FormErrors } from '@authenticator/errors';
import { Disclaimer, VerifyHeader } from '@authenticator/signup/components';

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

  handleCode = (e: Event): void => {
    const { value } = (e.currentTarget as HTMLFormElement);
    this.setState({ code: value });
  }

  handleSubmit = (): void => {
    this.props.verify({
      code: this.state.code,
    });
  }

  validateCode = (inputValue: string | number): NullAppError => {
    const minCodeLen = 6;
    if (String(inputValue).length < minCodeLen) {
      return {
        message: `Code should be at least ${minCodeLen} characters long`,
        code: 'invalid_code',
      }
    }

    return null;
  }

  render(): JSX.Element {
    return (
      <div class='signup'>
        <form class='signup-form'>
          <VerifyHeader goBack={this.props.restartFlow} />

          <Input
            class='signup-verify-input'
            type='string'
            value={this.state.code}
            placeholder='Enter 6 digit verification code'
            validator={this.validateCode}
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
