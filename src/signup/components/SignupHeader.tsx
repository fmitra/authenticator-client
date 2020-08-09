import { h } from 'preact';
import { Header } from '@authenticator/ui/components';

interface Props {
  isIntro: boolean;
  username: string;
  goBack: { (): void };
}

const Intro = (): JSX.Element => (
  <Header
    title={
      <span class='title'>Create an account</span>
    }
    subtitle={
      <div>
        <span class='subtitle'>Enter your email address or phone number</span>
        <span class='subtitle'>and start using our app today.</span>
      </div>
    }
  />
);

const AskPassword = (props: Props): JSX.Element => (
  <Header
    title={
      <span class='title'>Create a password</span>
    }
    subtitle={
      <div>
        <span class='subtitle'>You're almost there!</span>
        <span class='subtitle'>Create a password that complies with our password poilcy.</span>
      </div>
    }
  >
    <div class='signup-header__username' onClick={props.goBack}>
      {props.username}
    </div>
  </Header>
);

const SignupHeader = (props: Props): JSX.Element => (
  props.isIntro ? <Intro /> : <AskPassword {...props} />
);

export default SignupHeader;
