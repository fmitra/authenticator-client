import { h, Component } from 'preact';
import { route } from 'preact-router';

import routes from '@authenticator/app/routes';
import { Input, Button } from '@authenticator/form';
import { VerifyRequest } from '@authenticator/requests';
import { NullAppError } from '@authenticator/errors';

interface Props {
  path?: string;
  error: NullAppError;
  verify: { (data: VerifyRequest): any };
  isRequesting: boolean;
  isVerified: boolean;
}

interface State {
  code: string;
  error: { message: string; code: string } | null;
}

export default class SignupVerify extends Component<Props, State> {
  static defaultProps = {
    error: null,
    verify: (data: VerifyRequest): void => {},
    isRequesting: false,
    isVerified: false,
  };

  componentWillReceiveProps(props: Props, state: State): void {
    this.setState({ error: props.error });

    if (props.isVerified) {
      route(routes.SIGNUP_SUCCESS);
    }
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
            hasError={Boolean(this.state.error)}
            isDisabled={this.props.isRequesting}
            onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
};
