import { h, Component } from 'preact';

import { Input } from '@authenticator/form';
import { SignupRequest, APIError } from '@authenticator/requests';

export interface Props {
  path?: string;
  error: APIError | null;
  register: { (data: SignupRequest): any };
}

interface State {
  [key: string]: any;
}

export default class Signup extends Component<Props, State> {
  static defaultProps = {
    error: null,
    register: (data: SignupRequest): void => {},
  };

  render(): JSX.Element {
    return (
      <div class="signup">
        <form class="signup-form">

          <div class="test" onClick={(): void => this.props.register({
            type: "email", password: "thequickbrownfox", identity: "jane@example.com"
          })}>
            Click Me
          </div>

          <Input
            class="signup-input"
            label="Password"
            type="password"
            id="signup-password"
            error="Password is too short" />

          <Input
            class="signup-input"
            label="Username"
            type="text"
            id="signup-username"
            error="Username is not valid" />

        </form>
      </div>
    );
  }
}
