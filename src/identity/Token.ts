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

/**
 * A singleton class to manage the lifecycle of a token.
 */
class Token {
  private parsedToken: JWT;

  constructor() {
    this.parsedToken = {
      exp: 0,
      jti: '',
      iss: '',
      client_id: '',
      user_id: '',
      email: '',
      phone_number: '',
      state: '',
    };
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
    const b64Token = t.split('.')[1];

    let token: JWT = JSON.parse(atob(b64Token))
    this.parsedToken = token;

    const tokenName = config.token.name;
    store.set(tokenName, t);
  }

  get token(): string {
    const tokenName = config.token.name;
    return store.get(tokenName);
  }

  get expiresAt(): Date {
    return new Date(this.parsedToken.exp * 1000);
  }

  get jti(): string {
    return this.parsedToken.jti;
  }

  get issuer(): string {
    return this.parsedToken.iss;
  }

  get userID(): string {
    return this.parsedToken.user_id;
  }

  get clientID(): string {
    return this.parsedToken.client_id;
  }

  get email(): string {
    return this.parsedToken.email;
  }

  get phoneNumber(): string {
    return this.parsedToken.phone_number;
  }

  get state(): string {
    return this.parsedToken.state;
  }
};

export default new Token();
