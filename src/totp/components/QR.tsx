import { h } from 'preact';
import Qrious from 'qrious';

interface Props {
  value: string;
}

const QR = (props: Props): JSX.Element => {
  const qr = new Qrious({
    value: props.value,
    size: 500,
  });
  return <img src={qr.toDataURL('image/jpeg')} />;
};


export default QR;