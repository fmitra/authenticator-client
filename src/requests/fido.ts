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

export interface VerifyDeviceRequest {
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


