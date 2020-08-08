import { h } from 'preact';
import loginSplash from 'assets/images/login-splash.png';

const Splash = (): JSX.Element => (
  <div class='login-splash'>
    <img src={loginSplash} />
  </div>
);

export default Splash;
