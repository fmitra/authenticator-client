import { h, Component, ComponentChildren } from 'preact';
import { Link } from 'preact-router/match';

import routes from '@authenticator/app/routes';
import iconHelp from 'assets/icons/icon-help.svg';

interface DemoBarState {
  isHelpVisible: boolean;
};

interface DemoBarProps {
  children: ComponentChildren;
};

interface HelperProps {
  onClose: { (): void };
};

const Helper = (props: HelperProps): JSX.Element => (
  <div class='demo-bar-helper'>
    <div class='demo-bar-helper__wrapper'>
      <div class='demo-bar-helper__intro'>
        <span>
          This is a demonstration of user registration and authentication flows
          supporting FIDO U2F (via <a href='https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API' target='_blank' rel='noopener noreferrer'>Webauthn</a>),
          TOTP, and Email/SMS OTP code delivery. More details
          can be found <a href='https://github.com/fmitra/authenticator' target='_blank' rel='noopener noreferrer'>here</a>.
        </span>
        <span>
          Use the links below to test various flows. Note, that you must first
          register an account before testing FIDO, TOTP and OTP.
        </span>
      </div>
      <div onClick={props.onClose} class='demo-bar-helper__link demo-bar-helper__link--close'>
        Close
      </div>
      <Link class='demo-bar-helper__link' activeClassName='active' href={routes.LOGIN}>
        Login
      </Link>
      <Link class='demo-bar-helper__link' activeClassName='active' href={routes.SIGNUP}>
        Signup
      </Link>
      <Link class='demo-bar-helper__link' activeClassName='active' href={routes.DEVICE}>
        Enable FIDO Device
      </Link>
      <Link class='demo-bar-helper__link' activeClassName='active' href={routes.TOTP}>
        Enable TOTP
      </Link>
      <Link class='demo-bar-helper__link' activeClassName='active' href={routes.CONTACT}>
        Update OTP Delivery Address
      </Link>
    </div>
  </div>
);

export default class DemoBar extends Component<DemoBarProps, DemoBarState> {
  constructor(props: DemoBarProps) {
    super(props);

    this.state = {
      isHelpVisible: false,
    };
  }

  handleHelp = (): void => {
    this.setState({ isHelpVisible: !this.state.isHelpVisible });
  }

  render(): JSX.Element {
    return (
      <div class='demo-bar-wrapper'>
        { this.state.isHelpVisible && <Helper onClose={this.handleHelp} /> }
        <div class='demo-bar'>
          <img src={iconHelp} onClick={this.handleHelp} />
          <span>For Demonstration</span>
        </div>
        <div class='demo-bar-spacer'></div>
        { this.props.children }
      </div>
    );
  }
};
