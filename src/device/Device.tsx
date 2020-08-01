import { h, Component } from 'preact';

import { Button } from '@authenticator/form';
import { NullAppError, FormErrors, Errors } from '@authenticator/errors';
import { AppLayout, Loader } from '@authenticator/ui/components';
import iconFingerprint from 'assets/icons/icon-fingerprint.svg';

interface State {
  errors: FormErrors;
}

interface Props {
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
      <AppLayout class='device'>
        <div class='device-icon'>
          <img src={iconFingerprint} />
        </div>
        <div class='device-intro'>
          Connect your account to a FIDO device. You'll be prompted
          to use your device every time you log in.
        </div>
        {this.state.errors.notOk && <Errors
          class='device-errors'
          errors={this.state.errors} />}
        {
          !this.props.isRequesting ?
            <Button
              name='Add Device'
              class='button--wide'
              hasError={false}
              isDisabled={this.props.isRequesting}
              onClick={this.handleSubmit} /> :
            <Loader class='device-loader' />
        }
      </AppLayout>
    );
  }
};
