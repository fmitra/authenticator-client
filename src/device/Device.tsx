import { h, Component } from 'preact';

import { Button } from '@authenticator/form';
import { NullAppError, FormErrors, Errors } from '@authenticator/errors';

interface State {
  errors: FormErrors;
}

interface Props {
  path?: string;
  error: NullAppError;
  isRequesting: boolean;
  registerDevice: { (credentialsAPI: CredentialsContainer): any };
}

export default class Device extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      errors: new FormErrors(),
    }
  }

  static defaultProps = {
    error: null,
    isRequesting: false,
    registerDevice: (credentialsAPI: CredentialsContainer): void => {},
  }

  componentWillReceiveProps(props: Props, state: State): void {
    this.setState({
      errors: this.state.errors.update(props.error, 'request'),
    });
  }

  handleSubmit = (): void => {
    this.props.registerDevice(window.navigator.credentials);
  }

  render(): JSX.Element {
    return (
      <div>
        Device

        <Errors class='device__errors' errors={this.state.errors} />

        <Button
          name='Add Device'
          hasError={this.state.errors.notOk}
          isDisabled={this.props.isRequesting}
          onClick={this.handleSubmit} />
      </div>
    );
  }
};
