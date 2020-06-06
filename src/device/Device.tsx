import { h, Component } from 'preact';

import { Button } from '@authenticator/form';
import { NullAppError } from '@authenticator/errors';

interface Props {
  path?: string;
  error: NullAppError;
  isRequesting: boolean;
  registerDevice: { (credentialsAPI: CredentialsContainer): any };
}

export default class Device extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  static defaultProps = {
    error: null,
    isRequesting: false,
    registerDevice: (credentialsAPI: CredentialsContainer): void => {},
  }

  handleSubmit = (): void => {
    this.props.registerDevice(window.navigator.credentials);
  }

  render(): JSX.Element {
    return (
      <div>
        Device

        {/* TODO Handle error states */}
        <Button
          name="Add Device"
          hasError={false}
          isDisabled={false}
          onClick={this.handleSubmit} />
      </div>
    );
  }
};
