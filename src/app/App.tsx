import { h, Component } from 'preact';
import { Provider } from 'preact-redux';
import Router from 'preact-router';

import Login from '@authenticator/login';
import Signup from '@authenticator/signup';
import Device from '@authenticator/device';
import TOTP from '@authenticator/totp';
import TOTPDisable from '@authenticator/totpDisable';
import Contact from '@authenticator/contact';
import ContactVerify from '@authenticator/contactVerify';
import routes from '@authenticator/app/routes';
import store, { history } from '@authenticator/app/store';

export default class App extends Component {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Login path={routes.LOGIN} />
          <Signup path={routes.SIGNUP} />
          <Contact path={routes.CONTACT} />
          <ContactVerify path={routes.CONTACT_VERIFY} />
          <Device path={routes.DEVICE} />
          <TOTP path={routes.TOTP} />
          <TOTPDisable path={routes.TOTP_DISABLE} />
        </Router>
      </Provider>
    );
  }
};
