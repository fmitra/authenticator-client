import fetchMock from 'fetch-mock';

import { DeviceAPI, InitDeviceResponse } from '@authenticator/requests';
import { toBase64 } from '@authenticator/requests/DeviceAPI';
import config from '@authenticator/config';

const mockInitDeviceResponse = {
  publicKey: {
    challenge: 'b9aqYRIe/grw/Z4QfK1QvhYxrgsD3Cm743sFdrKdphI=',
    rp: {
      name: 'Authenticator',
      id: 'authenticator.local'
    },
    user: {
      name: 'ddddd@ddd.com',
      displayName: 'ddddd@ddd.com',
      id: 'MDFFQUREMjM4WFNaSkVUSDk4QUVEVkIyWVo='
    },
    pubKeyCredParams: [
      {
        type: 'public-key',
        alg: -7
      },
    ],
    authenticatorSelection: {
      authenticatorAttachment: 'cross-platform',
      requireResidentKey: false,
      userVerification: 'preferred'
    },
    timeout: 60000,
    attestation: 'direct'
  }
};

describe('DeviceAPI Test', (): void => {
  afterEach((): void => {
    fetchMock.restore();
  });

  test('it parses device initialization values to Uint8Arrays', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/device`;
    fetchMock.mock(url, {
      status: 200,
      body: mockInitDeviceResponse,
    });

    const responseMock: InitDeviceResponse = JSON.parse(
      JSON.stringify(mockInitDeviceResponse)
    ) as unknown as InitDeviceResponse;

    responseMock.publicKey.user.id = Uint8Array.from([
      48, 49, 69, 65, 68, 68, 50, 51, 56, 88, 83, 90, 74,
      69, 84, 72, 57, 56, 65, 69, 68, 86, 66, 50, 89, 90,
    ]);
    responseMock.publicKey.challenge = Uint8Array.from([
      111, 214, 170, 97, 18, 30, 254, 10, 240, 253, 158,
      16, 124, 173, 80, 190, 22, 49, 174, 11, 3, 220, 41,
      187, 227, 123, 5, 118, 178, 157, 166, 18,
    ]);

    const response = await DeviceAPI.initiate()
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual(responseMock);
  });

  test('it handles init device error', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/device`;
    fetchMock.mock(url, {
      status: 400,
      body: {
        error: {
          code: 'webauthn',
          message: 'Invalid domain',
        }
      },
    });
    await expect(DeviceAPI.initiate()).rejects.toEqual({
      ok: false,
      resultError: {
        message: 'Invalid domain',
        code: 'webauthn'
      },
      status: 400,
    });
  });

  test('it verifies a user\'s credential', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/device/verify`;
    const credentialMock = {
      id: 'credentialID',
      rawId: new ArrayBuffer(0),
      response: {
        attestationObject: new ArrayBuffer(0),
        clientDataJSON: new ArrayBuffer(0),
      },
      type: 'public-key',
    };
    fetchMock.mock(url, {
      status: 201,
      body: {},
    });

    const response = await DeviceAPI.verify(credentialMock);
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({});
  });

  test('it parses BufferSource to base64', (): void => {
    const arrayBuffer = new ArrayBuffer(8);
    expect(toBase64(arrayBuffer)).toEqual('AAAAAAAAAAA');
  });
});
