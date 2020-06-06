import store from 'store2';
import config from '@authenticator/config';

export interface JWT {
  exp: number;
  jti: string;
  iss: string;
  client_id: string;
  user_id: string;
  email: string;
  phone_number: string;
  state: string;
}

const defaultToken = {
  exp: 0,
  jti: '',
  iss: '',
  client_id: '',
  user_id: '',
  email: '',
  phone_number: '',
  state: '',
}

/**
 * A singleton class to manage a token stored in localStorage.
 */
class Token {
  private parsedToken: JWT;

  constructor() {
    this.parsedToken = defaultToken;
  }

  unpackToken(t: string): JWT {
    const b64Token = t.split('.')[1];
    return JSON.parse(atob(b64Token));
  }

  unpackedToken(): JWT {
    const tokenNotSet = (
      JSON.stringify(this.parsedToken) ===
      JSON.stringify(defaultToken)
    );

    if (tokenNotSet && this.token) {
      this.parsedToken = this.unpackToken(this.token);
    }

    return this.parsedToken;
  }

  /**
   * Parses and sets a token to the object.
   *
   * WARNING: Setting a token may raise an exception either
   * while parsing the base64 encoded string or parsing the
   * decoded string to JSON.
   *
   * The caller should budget and handle the exceptions
   * appropriately. We do not handle exceptions here as it is
   * important for callers to be aware if an invalid token was
   * received.
   */
  set(t: string): void {
    this.parsedToken = this.unpackToken(t);

    const localToken = config.token.name;
    store.set(localToken, t);
  }

  get token(): string {
    const localToken = config.token.name;
    return store.get(localToken);
  }

  get expiresAt(): Date {
    return new Date(this.unpackedToken().exp * 1000);
  }

  get jti(): string {
    return this.unpackedToken().jti;
  }

  get issuer(): string {
    return this.unpackedToken().iss;
  }

  get userID(): string {
    return this.unpackedToken().user_id;
  }

  get clientID(): string {
    return this.unpackedToken().client_id;
  }

  get email(): string {
    return this.unpackedToken().email;
  }

  get phoneNumber(): string {
    return this.unpackedToken().phone_number;
  }

  get state(): string {
    return this.unpackedToken().state;
  }
};

export default new Token();
