import { Component } from 'preact';
import { route } from 'preact-router';

export default {
  BASE: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DEVICE: '/device',
  TOTP: '/totp',
  TOTP_DISABLE: '/totp/disable',
  CONTACT: '/contact',
};

interface Props {
  to: string;
  path: string;
}

/**
 * Redirects user from `path` to `to`.
 *
 * Preact Router does not come with a built in redirect component
 * Reference: https://github.com/preactjs/preact-router#redirects
 */
export class Redirect extends Component<Props, {}> {
  componentWillMount(): void {
    route(this.props.to, true);
  }

  render(): null {
    return null;
  }
}
