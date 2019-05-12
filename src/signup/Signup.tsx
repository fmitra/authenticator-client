import { h, Component } from 'preact';

import { Input } from '@authenticator/form';

export interface Props {
  path?: string;
  error: string;
  register: { (): any };
}

interface State {
  [key: string]: any;
}

export default class Signup extends Component<Props, State> {
  static defaultProps = {
    error: "",
    register: () => {},
  };

  render(): JSX.Element {
    return (
      <div class="signup">
        <form class="signup-form">

          <div class="test" onClick={this.props.register}>
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
