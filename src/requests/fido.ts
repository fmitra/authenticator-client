export interface InitDeviceResponse {
  publicKey:  PublicKeyCredentialCreationOptions;
}

export interface CredentialResponse {
  id: string;
  rawId: ArrayBuffer;
  response: {
    attestationObject: ArrayBuffer;
    clientDataJSON: ArrayBuffer;
  };
  type: string;
}

export interface VerifyDeviceRequest {
  id: string;
  rawId: string;
  type: string;
  response: {
    attestationObject: string;
    clientDataJSON: string;
  };
}

export  interface VerifyDeviceResponse {
  publicKey: PublicKeyCredentialRequestOptions;
}

export const toBase64 = (value: ArrayBuffer): string => {
  // Convert to array in case the value is long
  const asArray = new Uint8Array(value);
  return Buffer.from(asArray).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

export interface PubKeyCredentialResponse {
  id: string;
  rawId: ArrayBuffer;
  response: {
    attestationObject: ArrayBuffer;
    clientDataJSON: ArrayBuffer;
    authenticatorData: ArrayBuffer;
    signature: ArrayBuffer;
    userHandle: ArrayBuffer;
  };
  type: string;
}

export interface VerifyAuthRequest {
  id: string;
  rawId: string;
  type: string;
  response: {
    attestationObject: string;
    clientDataJSON: string;
    authenticatorData: string;
    signature: string;
    userHandle: string;
  };
}
