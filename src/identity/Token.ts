import config from '@authenticator/config';
import storage, { StorageAPI } from '@authenticator/identity/storage';

export type TFAOption = string;

export const OTPPhone: TFAOption = 'otp_phone';
export const OTPEmail: TFAOption = 'otp_email';
export const TOTP: TFAOption = 'totp';
export const Device: TFAOption = 'device';

interface Code {
  address: string;
}

export interface JWT {
  exp: number;
  jti: string;
  iss: string;
  client_id: string;
  user_id: string;
  email: string;
  phone_number: string;
  state: string;
  code?: string;
  tfa_options: TFAOption[];
  default_tfa: TFAOption;
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
  tfa_options: [],
  default_tfa: '',
}

/**
 * A singleton class to manage a token stored in localStorage.
 */
class Token {
  private parsedToken: JWT;
  private storage: StorageAPI;

  constructor() {
    this.parsedToken = defaultToken;
    this.storage = storage();
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
    this.storage.setItem(localToken, t);
  }

  get token(): string {
    const localToken = config.token.name;
    return this.storage.getItem(localToken) || '';
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

  get tfaOptions(): TFAOption[] {
    return this.unpackedToken().tfa_options;
  }

  get defaultTFA(): TFAOption {
    return this.unpackedToken().default_tfa;
  }

  get lastMessageAddress(): string {
    let encoded: string;
    let code: Code;

    try {
      encoded = atob(this.unpackedToken().code || '');
    } catch (e) {
      return '';
    }

    try {
      code = JSON.parse(encoded);
    } catch (e) {
      return '';
    }

    return code.address;
  }
};

export default new Token();
