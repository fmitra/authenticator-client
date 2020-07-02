import fetchMock from 'fetch-mock';

import { LoginAPI, InitDeviceResponse } from '@authenticator/requests';
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

describe('LoginAPI Test', (): void => {
  afterEach((): void => {
    fetchMock.restore();
  });

  test('it verifies a device signing', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/login/verify-device`;
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
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    const response = await LoginAPI.verifyDevice(credentialMock)
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({
      token: 'jwt-token',
      clientID: 'client-id',
    });
  });

  test('it verifies an OTP code', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/login/verify-code`;
    fetchMock.mock(url, {
      status: 201,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    const response = await LoginAPI.verifyCode({
      code: '123456',
    });
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({
      token: 'jwt-token',
      clientID: 'client-id',
    });
  });

  test('it retrieves a device challenge', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/login/verify-device`;
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

    const response = await LoginAPI.challenge()
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual(responseMock);
  });

  test('it requests to login', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/login`;
    fetchMock.mock(url, {
      status: 201,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    const response = await LoginAPI.login({
      password: 'swordfish',
      identity: 'jane@example.com',
      type: 'email',
    });
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({
      token: 'jwt-token',
      clientID: 'client-id',
    });
  });
});
