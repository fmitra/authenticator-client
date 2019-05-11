import { h, Component } from 'preact';
import Router from 'preact-router';

import Login from '@authenticator/login/Login';
import Signup from '@authenticator/signup/Signup';
import Device from '@authenticator/device/Device';
import ROUTES from '@authenticator/app/routes';

export default class App extends Component {
  public render(): JSX.Element {
    return (
      <Router>
        <Login path={ROUTES.LOGIN} />
        <Signup path={ROUTES.SIGNUP} />
        <Device path={ROUTES.DEVICE} />
      </Router>
    );
  }
};
