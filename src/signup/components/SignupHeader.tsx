import { h } from 'preact';

interface Props {
  isIntro: boolean;
  username: string;
  goBack: { (): void };
}

const Intro = (): JSX.Element => (
  <div class='signup-header__content'>
    <div class='signup-header__title'>Create an account</div>
    <div class='signup-header__subtitle'>
      <span>Enter your email address or phone number</span>
      <span>and start using our app today.</span>
    </div>
  </div>
);

const AskPassword = (props: Props): JSX.Element => (
  <div class='signup-header__content'>
    <div class='signup-header__title'>Create a password</div>
    <div class='signup-header__subtitle'>
      <span>You're almost there!</span>
      <span>Create a password that complies with our password policy.</span>
    </div>
    <div class='signup-header__username' onClick={props.goBack}>
      {props.username}
    </div>
  </div>
);

const SignupHeader = (props: Props): JSX.Element => (
  <div class='signup-header'>
    { props.isIntro ? <Intro /> : <AskPassword {...props} /> }
  </div>
);

export default SignupHeader;
