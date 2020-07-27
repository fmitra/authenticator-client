import { h } from 'preact';
import iconSuccess from 'assets/icons/icon-success.svg';

const Success = (): JSX.Element => {
  return (
    <div class='login'>
      <div class='login-success'>
        <img src={iconSuccess} />
        <span>Success</span>
      </div>
    </div>
  );
};

export default Success;
