import { h, render } from 'preact';

import App from 'src/authenticator/app';

render(<App />, document.getElementById('app') as HTMLElement);
