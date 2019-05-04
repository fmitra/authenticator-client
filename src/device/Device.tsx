/** @jsx h */
import { h } from 'preact';

interface Props {
  path: string;
}

function Device(props: Props): JSX.Element {
  console.log(props)

  return (
    <div>
      Device
    </div>
  );
};

export default Device;
