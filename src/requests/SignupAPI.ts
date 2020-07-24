import Requestor, { APIResponse } from '@authenticator/requests/Requestor';
import { VerifyCodeRequest, TokenResponse } from '@authenticator/requests/token';
import { ContactMethod } from '@authenticator/identity/contact';

export interface SignupRequest {
  password: string;
  identity: string;
  type: ContactMethod;
}

/**
 * An interface for the external Signup API.
 *
 * SignupAPI provides consistent formatting and error handling
 * for authentication endpoints.
 */
class SignupAPI extends Requestor {
  /**
   * Register a new user.
   *
   * A user identity (eg phone or email) is available
   * for registration until a user calls the verify endpoint.
   */
  register(data: SignupRequest): Promise<APIResponse<TokenResponse>> {
    const url = this.endpoint('signup');
    return this.post<TokenResponse>(url, data);
  }

  /**
   * Verify a recently registered user.
   *
   * After verification, a user is considered successfully registered
   * for our services.
   */
  verify(data: VerifyCodeRequest): Promise<APIResponse<TokenResponse>> {
    const url = this.endpoint('signup/verify');
    return this.post<TokenResponse>(url, data);
  }
}

export default new SignupAPI();
