import { h } from 'preact';

const Loader = (): JSX.Element => (
  <div class='loader'>
    <div class='loader__bounce-1'></div>
    <div class='loader__bounce-2'></div>
    <div class='loader__bounce-3'></div>
  </div>
);

export default Loader;
