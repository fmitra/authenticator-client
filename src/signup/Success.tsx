import { h } from 'preact';
import iconSuccess from 'assets/icons/icon-success.svg';

const Success = (): JSX.Element => {
  return (
    <div class='signup'>
      <div class='signup-success'>
        <img src={iconSuccess} />
        Account created
      </div>
    </div>
  );
};

export default Success;
