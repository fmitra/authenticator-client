import { h } from 'preact';
import Qrious from 'qrious';

interface Props {
  value: string;
  class: string;
}

const QR = (props: Props): JSX.Element => {
  const qr = new Qrious({
    value: props.value,
    size: 500,
  });
  return (
    <div class={props.class}>
      <img src={qr.toDataURL('image/jpeg')} />
    </div>
  );
};


export default QR;
