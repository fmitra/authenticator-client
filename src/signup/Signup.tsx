import { h } from 'preact';

interface Props {
  path: string;
}

function Signup(props: Props): JSX.Element {
  console.log(props)

  return (
    <div>
      Signup
    </div>
  );
};

export default Signup;
