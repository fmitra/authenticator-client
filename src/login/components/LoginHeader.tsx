import { h } from 'preact';

const LoginHeader = (): JSX.Element => (
  <div class='login-header'>
    <div class='login-header__content'>
      <div class='login-header__title'>
        <span>Login</span>
      </div>
    </div>
    <div class='login-header__subtitle'>
      <span>Login to start using our app today</span>
    </div>
  </div>
);

export default LoginHeader;
