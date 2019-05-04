import { h, Component } from 'preact';
import Router from 'preact-router';

import Login from 'src/login/Login';
import Signup from 'src/signup/Signup';
import Device from 'src/device/Device';

import ROUTES from 'src/authenticator/routes';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Login path={ROUTES.LOGIN} />
        <Signup path={ROUTES.SIGNUP} />
        <Device path={ROUTES.DEVICE} />
      </Router>
    );
  }
};
