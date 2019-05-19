import { h, Component } from 'preact';
import { Provider } from 'preact-redux';
import Router from 'preact-router';

import Login from '@authenticator/login/Login';
import Signup from '@authenticator/signup';
import SignupVerify from '@authenticator/signupVerify';
import Device from '@authenticator/device/Device';
import routes from '@authenticator/app/routes';
import store from '@authenticator/app/store';

export default class App extends Component {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <Router>
          <Login path={routes.LOGIN} />
          <Signup path={routes.SIGNUP} />
          <SignupVerify path={routes.SIGNUP_VERIFY} />
          <Device path={routes.DEVICE} />
        </Router>
      </Provider>
    );
  }
};
