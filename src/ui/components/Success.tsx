import { h, ComponentChildren } from 'preact';
import iconSuccess from 'assets/icons/icon-success.svg';

interface Props {
  children: ComponentChildren;
}

const Success = (props: Props): JSX.Element => {
  return (
    <div class='success'>
      <img src={iconSuccess} />
      {props.children}
    </div>
  );
};

export default Success;
