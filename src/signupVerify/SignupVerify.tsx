import { h, Component } from 'preact';

import { Input, Button } from '@authenticator/form';
import { VerifyRequest, APIError } from '@authenticator/requests';

interface Props {
  path?: string;
  error: APIError | null;
  verify: { (data: VerifyRequest): any };
  isRequesting: boolean;
  isVerified: boolean;
}

interface State {
  code: string;
}

export default class SignupVerify extends Component<Props, State> {
  static defaultProps = {
    error: null,
    verify: (data: VerifyRequest): void => {},
    isRequesting: false,
    isVerified: false,
  };

  handleCode = (e: Event): void => {
    const { value } = (e.currentTarget as HTMLFormElement);
    this.setState({ code: value });
  }

  handleSubmit = (): void => {
    this.props.verify({
      code: this.state.code,
    });
  }

  render(): JSX.Element {
    return (
      <div class='signup-verify'>
        <form class='signup-verify-form'>
          <Input
            class='signup-verify-input'
            label='Code'
            type='string'
            id='signup-verify-code'
            onChange={this.handleCode} />

          <Button
            name='Submit'
            error={this.props.error ? this.props.error.message : ''}
            isDisabled={this.props.isRequesting}
            onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
};
