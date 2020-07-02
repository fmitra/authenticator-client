import Requestor, { APIResponse } from '@authenticator/requests/Requestor';
import { TokenResponse } from '@authenticator/requests/token';
import { ContactMethod } from '@authenticator/identity/contact';

export interface DeliveryRequest {
  deliveryMethod: ContactMethod;
  address: string;
}

export interface DeactivateRequest {
  deliveryMethod: ContactMethod;
}

export interface SendRequest {
  deliveryMethod: ContactMethod;
}

export interface VerifyContactRequest {
  code: string;
  isDisabled: boolean;
}

/**
 * An interface for the external Contact API.
 *
 * ContactAPI provides consistent formatting and error handling
 * for authentication endpoints.
 */
class ContactAPI extends Requestor {
  /**
   * Sends an OTP to an unverified address to verify ownership of the address.
   */
  checkAddress(data: DeliveryRequest): Promise<APIResponse<TokenResponse>> {
    const url = this.endpoint('contact/check-address');
    return this.post<TokenResponse>(url, data);
  }

  /**
   * Disables a verified address from receiving OTP codes.
   *
   * Disabled address will remain attached to a User's profile.
   */
  disable(data: DeactivateRequest): Promise<APIResponse<TokenResponse>> {
    const url = this.endpoint('contact/disable');
    return this.post<TokenResponse>(url, data);
  }

  /**
   * Removes an address from a User's profile.
   *
   * Removed addresses will no longer be eligible to receive OTP
   * codes unless they are re-verified.
   */
  remove(data: DeactivateRequest): Promise<APIResponse<TokenResponse>> {
    const url = this.endpoint('contact/remove');
    return this.post<TokenResponse>(url, data);
  }

  /**
   * Verify a new address to be set on a User's profile.
   *
   * Addresses are enabled as an OTP delivery channel by default, unless
   * `isDisabled` is set to true.
   */
  verify(data: VerifyContactRequest): Promise<APIResponse<TokenResponse>> {
    const url = this.endpoint('contact/verify');
    return this.post<TokenResponse>(url, data);
  }

  /**
   * Sends an OTP code to a verified address.
   */
  send(data: SendRequest): Promise<APIResponse<TokenResponse>> {
    const url = this.endpoint('contact/send');
    return this.post<TokenResponse>(url, data);
  }
}

export default new ContactAPI();
