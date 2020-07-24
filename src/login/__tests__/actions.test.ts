import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import config from '@authenticator/config';
import { verifyCode, verifyDevice, login } from '@authenticator/login/actions';
import {
  REQUEST,
  REQUEST_ERROR,
  VERIFIED,
  VERIFY_ACCOUNT,
} from '@authenticator/login/constants';
import { mockToken } from '@authenticator/identity/mock';

const mockDeviceResponse = {
  publicKey: {
    challenge: "4xH0vUsr6b2oHTKn7GS3I9ZbqEHSF4aLAil9exrCWoI=",
    timeout: 60000,
    rpId: "authenticator.local",
    allowCredentials: [
      {
        type: "public-key",
        id: "kXV0GAUZjDSncqwfxvxVSN55IhTxty88Fhg3S38LU6w9Jl421SZQlf6epPuLhP5KwKICDUJk+/w3F8DrDj1vqA=="
      }
    ]
  }
}

describe('Login Actions: Login Test', (): void => {
  let storeMock: any;

  beforeEach((): void => {
    const middlewares = [ thunk ];
    const mockStore = configureMockStore(middlewares);
    storeMock = mockStore({});
  });

  afterEach((): void => {
    fetchMock.restore();
  });

  test('dispatches REQUEST_ERROR on request', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/login`;
    fetchMock.mock(url, {
      status: 400,
      body: {
        error: {
          message: 'Password is incorrect',
          code: 'invalid_password',
        },
      },
    });

    await storeMock.dispatch(login({
      password: 'swordfish',
      identity: 'jane@example.com',
      type: 'email',
    }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'invalid_password',
        message: 'Password is incorrect',
      }},
    ]);
  });

  test('dispatches REQUEST_ERROR on setting token', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/login`;
    fetchMock.mock(url, {
      status: 201,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    await storeMock.dispatch(login({
      password: 'swordfish',
      identity: 'jane@example.com',
      type: 'email',
    }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'invalid_token',
        message: 'Token is not correctly formatted',
      }},
    ]);
  });

  test('dispatches VERIFY_ACCOUNT on success', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/login`;

    fetchMock.mock(url, {
      status: 201,
      body: {
        token: mockToken,
        clientID: 'client-id',
      },
    });

    await storeMock.dispatch(login({
      password: 'swordfish',
      identity: 'jane@example.com',
      type: 'email',
    }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: VERIFY_ACCOUNT },
    ]);
  });
});

describe('Login Actions: Verify Test', (): void => {
  let storeMock: any;
  let credentialsMock: any;

  beforeEach((): void => {
    const middlewares = [ thunk ];
    const mockStore = configureMockStore(middlewares);
    storeMock = mockStore({});
    credentialsMock = {
      get: (options: any): Promise<any> => {
        throw new Error('whoops!');
      },
      create: jest.fn(),
      store: jest.fn(),
      preventSilentAccess: jest.fn(),
      requireUserMediation: jest.fn(),
    };
  });

  afterEach((): void => {
    fetchMock.restore();
  });

  test('dispatches REQUEST_ERROR on code verification request', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/login/verify-code`;
    fetchMock.mock(url, {
      status: 400,
      body: {
        error: {
          code: 'invalid_code',
          message: 'Code is invalid.',
        },
      },
    });

    await storeMock.dispatch(verifyCode({ code: '012345' }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'invalid_code',
        message: 'Code is invalid.',
      }},
    ]);
  });

  test('dispatches VERIFIED on code verification', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/login/verify-code`;
    fetchMock.mock(url, {
      status: 200,
      body: {
        token: mockToken,
        clientID: 'client-id',
        refreshToken: 'refresh-token',
      },
    });

    await storeMock.dispatch(verifyCode({ code: '012345' }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: VERIFIED },
    ]);
  });

  test('dispatches VERIFIED for verified device', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/login/verify-device`;
    fetchMock.get(url, {
      status: 200,
      body: mockDeviceResponse,
    });
    fetchMock.post(url, {
      status: 200,
      body: {
        token: mockToken,
        clientID: 'client-id',
        refreshTokne: 'refresh-token',
      },
    });

    credentialsMock.get = (options: any): Promise<any> => {
      return Promise.resolve({
        id: 'credentialID',
        rawID: new ArrayBuffer(0),
        response: {
          attestationObject: new ArrayBuffer(0),
          clientDataJSON: new ArrayBuffer(0),
          authenticatorData: new ArrayBuffer(0),
          signature: new ArrayBuffer(0),
          userHandle: new ArrayBuffer(0),
        },
        type: 'public-key',
      });
    };

    await storeMock.dispatch(verifyDevice(credentialsMock));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: VERIFIED },
    ]);
  });

  test('dispatches REQUEST_ERROR on navigator credentials retrieval', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/login/verify-device`;
    fetchMock.get(url, {
      status: 200,
      body: mockDeviceResponse,
    });

    await storeMock.dispatch(verifyDevice(credentialsMock));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'credentials_dom_error',
        message: 'whoops!',
      }},
    ]);
  });
});
