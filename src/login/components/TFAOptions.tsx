import { h, Component } from 'preact';

import {
  TFAOption,
  OTPPhone,
  OTPEmail,
  TOTP,
  Device,
} from '@authenticator/identity/Token';

interface Props {
  options: TFAOption[];
  setTFAOption: { (option: TFAOption): void };
}

interface State {
  isOptionsVisible: boolean;
}

const tfaOptionMap: {[key: string]: string} = {
  [OTPPhone]: 'Receive a verification code through SMS',
  [OTPEmail]: 'Receive a verification code through Email',
  [TOTP]: 'Generate your own verification code',
  [Device]: 'Authenticate with your device',
}

export default class TFAOptions extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOptionsVisible: false,
    }
  }

  toggleOptions = (): void => {
    this.setState({ isOptionsVisible: !this.state.isOptionsVisible });
  }

  handleTFASelect = (option: TFAOption): void => {
    this.toggleOptions();
    this.props.setTFAOption(option);
  }

  render(): JSX.Element {
    const options = this.props.options.map(x => (
      <div class='login-options__option' onClick={() => this.handleTFASelect(x)}>
        <span>{tfaOptionMap[x]}</span>
      </div>
    ));

    return (
      <div class='login-options'>
        <div class='login-options__toggle'
          onClick={this.toggleOptions}>
          {
            this.state.isOptionsVisible ?
            <span>Select an option below:</span> :
            <span class='login-options__toggle-link'>See other options for logging in</span>
          }
        </div>
        {this.state.isOptionsVisible && options}
      </div>
    );
  }
}
