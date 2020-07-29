import { h } from 'preact';
import iconSuccess from 'assets/icons/icon-success.svg';

const Success = (): JSX.Element => {
  return (
    <div class='totp'>
      <div class='totp-success'>
        <img src={iconSuccess} />
        <span>Success</span>
      </div>
    </div>
  );
};

export default Success;
