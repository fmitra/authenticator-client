import Requestor, { APIResponse } from '@authenticator/requests/Requestor';
import { TokenResponse } from '@authenticator/requests/token';

export interface TOTPRequest {
  code: string;
}

export interface SecretResponse {
  totp: string;
}

/**
 * An interface for the external TOTP API.
 *
 * TOTPAPI provides consistent formatting and error handling
 * for authentication endpoints.
 */
class TOTPAPI extends Requestor {
  /**
   * Retrieves a TOTP secret in the format of a TOTP URI.
   *
   * Sample format:
   *  otpauth://totp/Example:jane@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example
   */
  secret(): Promise<APIResponse<SecretResponse>> {
    const url = this.endpoint('totp');
    return this.post<SecretResponse>(url);
  }

  /**
   * Disables TOTP as a 2FA method for a User.
   */
  disable(data: TOTPRequest): Promise<APIResponse<TokenResponse>> {
    const url = this.endpoint('totp/configure');
    return this.del<TokenResponse>(url, data);
  }

  /*
   * Enables TOTP as a 2FA method for a User.
   */
  enable(data: TOTPRequest): Promise<APIResponse<TokenResponse>> {
    const url = this.endpoint('totp/configure');
    return this.post<TokenResponse>(url, data);
  }
}

export default new TOTPAPI();
