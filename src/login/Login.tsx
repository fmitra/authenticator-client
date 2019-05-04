import { h } from 'preact';

interface Props {
  path: string
}

function Login(props: Props) {
  console.log(props)

  return (
    <div>
      Login
    </div>
  );
};

export default Login;
