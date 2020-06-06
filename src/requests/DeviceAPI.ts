import Requestor, { APIResponse } from '@authenticator/requests/Requestor';

export interface CredentialResponse {
  id: string;
  rawId: ArrayBuffer;
  response: {
    attestationObject: ArrayBuffer;
    clientDataJSON: ArrayBuffer;
  };
  type: string;
}

export interface InitDeviceResponse {
  publicKey:  PublicKeyCredentialCreationOptions;
}

interface VerifyDeviceRequest {
  id: string;
  rawId: string;
  response: {
    attestationObject: string;
    clientDataJSON: string;
  };
  type: string;
}

export const toBase64 = (value: ArrayBuffer): string => {
  // Convert to array in case the value is long
  const asArray = new Uint8Array(value);
  return Buffer.from(asArray).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * An interface for the Device management API.
 *
 * DeviceAPI provides consistent formatting and error handling
 * for device endpoints.
 */
class DeviceAPI extends Requestor {
  /**
   * Initiates device registration.
   *
   * On success we receive a valid payload to be passed into
   * navigator.credentials.create.
   */
  async initiate(): Promise<APIResponse<InitDeviceResponse>> {
    const url = this.endpoint('device');

    let response: APIResponse<InitDeviceResponse>;

    try {
      response = await this.post<InitDeviceResponse>(url);
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

  /**
   * Verifies a device registration request.
   *
   * Upon verification, a device becomes registered
   * with a User's account for use as a FIDO compliant
   * 2FA device.
   */
  verify(credential: CredentialResponse): Promise<APIResponse<{}>> {
    const url = this.endpoint('device/verify');

    const data: VerifyDeviceRequest = {
      id: credential.id,
      rawId: toBase64(credential.rawId),
      response: {
        attestationObject: toBase64(credential.response.attestationObject),
        clientDataJSON: toBase64(credential.response.clientDataJSON),
      },
      type: credential.type,
    }

    return this.post<{}>(url, data);
  }
}

export default new DeviceAPI();
