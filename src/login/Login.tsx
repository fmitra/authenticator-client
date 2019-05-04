/** @jsx h */
import { h } from 'preact';

interface Props {
  path: string;
}

function Login(props: Props): JSX.Element {
  console.log(props)

  return (
    <div>
      Login
    </div>
  );
};

export default Login;
