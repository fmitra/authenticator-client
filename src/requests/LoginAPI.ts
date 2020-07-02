import { TokenResponse } from '@authenticator/requests/token';
import Requestor, { APIResponse } from '@authenticator/requests/Requestor';
import { ContactMethod } from '@authenticator/identity/contact';
import {
  toBase64,
  CredentialResponse,
  InitDeviceResponse,
  VerifyDeviceRequest,
} from '@authenticator/requests/fido';

export interface VerifyLoginCodeRequest {
  code: string;
}

export interface LoginRequest {
  password: string;
  identity: string;
  type: ContactMethod;
}

/**
 * An interface for the external Login API.
 *
 * LoginAPI provides consistent formatting and error handling
 * for authentication endpoints.
 */
class LoginAPI extends Requestor {
  /**
   * Initiates login.
   *
   * On success, a user is prompted to complete a 2FA step through
   * signing/verifying a device challenge or verifying an OTP/TOTP
   * code.
   */
  login(data: LoginRequest): Promise<APIResponse<TokenResponse>> {
    const url = this.endpoint('login');
    return this.post<TokenResponse>(url, data);
  }

  /**
   * Verifies a user's identity through an OTP code.
   *
   * A user must submit an OTP code delivered through email or SMS
   * to receive an authorized JWT token.
   */
  verifyCode(data: VerifyLoginCodeRequest): Promise<APIResponse<TokenResponse>> {
    const url = this.endpoint('login/verify-code');
    return this.post<TokenResponse>(url, data);
  }

  /**
   * Verifies a user's identity through signing a device challenge.
   *
   * A user must request a device challenge prior to using
   * this enpdoint. Device challenges are signed through a FIDO compliant
   * device.
   */
  verifyDevice(credential: CredentialResponse): Promise<APIResponse<TokenResponse>> {
    const url = this.endpoint('login/verify-device');
    const data: VerifyDeviceRequest = {
      id: credential.id,
      rawId: toBase64(credential.rawId),
      response: {
        attestationObject: toBase64(credential.response.attestationObject),
        clientDataJSON: toBase64(credential.response.clientDataJSON),
      },
      type: credential.type,
    }

    return this.post<TokenResponse>(url, data);
  }

  /**
   * Requests a device challenged to be signed by the user.
   */
  async challenge(): Promise<APIResponse<InitDeviceResponse>> {
    const url = this.endpoint('login/verify-device');

    let response: APIResponse<InitDeviceResponse>;

    try {
      response = await this.get<InitDeviceResponse>(url);
    } catch(e) {
      return Promise.reject(e);
    }

    if (!response.resultSuccess) {
      return Promise.resolve(response);
    }

    // JSON API returns the challenge and user ID as a string. In order
    // to work with the browsers credential's API, we expect these values
    // to be parsed into a BufferSource.
    //
    // We cast these values to `unknown` before casting to `string` because
    // TypeScript believes these fields are already a BufferSoruce, which prevents
    // us from passing it to the TextEncoder which expects a string.
    response.resultSuccess.publicKey.challenge = Uint8Array.from(atob(
      response.resultSuccess.publicKey.challenge as unknown as string
    ), (c: string): number => c.charCodeAt(0));

    response.resultSuccess.publicKey.user.id = Uint8Array.from(atob(
      response.resultSuccess.publicKey.user.id as unknown as string
    ), (c: string): number => c.charCodeAt(0));

    return Promise.resolve(response);
  }
}

export default new LoginAPI();
