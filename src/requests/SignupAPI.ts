import Requestor, { APIResponse } from '@authenticator/requests/Requestor';

export interface VerifyRequest {
  code: string;
}

export interface SignupRequest {
  password: string;
  identity: string;
  type: string;
}

export interface SignupResponse {
  token: string;
  clientID: string;
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
  register(data: SignupRequest): Promise<APIResponse<SignupResponse>> {
    const url = this.endpoint('signup');
    return this.post<SignupResponse>(url, data);
  }

  /**
   * Verify a recently registered user.
   *
   * After verification, a user is considered successfully registered
   * for our services.
   */
  verify(data: VerifyRequest): Promise<APIResponse<SignupResponse>> {
    const url = this.endpoint('signup/verify');
    return this.post<SignupResponse>(url, data);
  }
}

export default new SignupAPI();
