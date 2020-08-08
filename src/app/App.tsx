import { h, Component } from 'preact';
import { Provider } from 'preact-redux';
import Router from 'preact-router';

import Login from '@authenticator/login';
import Signup from '@authenticator/signup';
import Device from '@authenticator/device';
import TOTP from '@authenticator/totp';
import TOTPDisable from '@authenticator/totpDisable';
import Contact from '@authenticator/contact';
import routes, { Redirect } from '@authenticator/app/routes';
import store, { history } from '@authenticator/app/store';
import '@styles';

export default class App extends Component {
  render(): JSX.Element {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Redirect path='/' to={routes.LOGIN} />
          <Login path={routes.LOGIN} />
          <Signup path={routes.SIGNUP} />
          <Contact path={routes.CONTACT} />
          <Device path={routes.DEVICE} />
          <TOTP path={routes.TOTP} />
          <TOTPDisable path={routes.TOTP_DISABLE} />
        </Router>
      </Provider>
    );
  }
};
