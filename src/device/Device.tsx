import { h, Component } from 'preact';

import { Button } from '@authenticator/form';
import { NullAppError, FormErrors, Errors } from '@authenticator/errors';
import { Loader } from '@authenticator/ui/components';
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
      <div class='device'>
        <div class='device-form'>
          <div class='device__icon'>
            <img src={iconFingerprint} />
          </div>
          <div class='device__intro'>
            Connect your account to a FIDO device. You'll be prompted
            to use your device every time you log in.
          </div>
          {this.state.errors.notOk && <Errors
            class='device__errors'
            errors={this.state.errors} />}
          {
            !this.props.isRequesting ?
            <Button
              name='Add Device'
              class='device-button'
              hasError={this.state.errors.notOk}
              isDisabled={this.props.isRequesting}
              onClick={this.handleSubmit} /> :
            <Loader class='device-loader' />
          }
        </div>
      </div>
    );
  }
};
