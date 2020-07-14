import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import config from '@authenticator/config';
import { verifyCode, verifyDevice } from '@authenticator/loginVerify/actions';
import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '@authenticator/loginVerify/constants';

const mockDeviceResponse = {
  "publicKey": {
    "challenge": "4xH0vUsr6b2oHTKn7GS3I9ZbqEHSF4aLAil9exrCWoI=",
    "timeout": 60000,
    "rpId": "authenticator.local",
    "allowCredentials": [
      {
        "type": "public-key",
        "id": "kXV0GAUZjDSncqwfxvxVSN55IhTxty88Fhg3S38LU6w9Jl421SZQlf6epPuLhP5KwKICDUJk+/w3F8DrDj1vqA=="
      }
    ]
  }
}

const mockToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiO' +
  'jE1NTkzNjQ1ODEsImp0aSI6IjAxREM4TVNUMFlFSFZFSEpDSk5BVDc2WDFWIiw' +
  'iaXNzIjoiYXV0aGVudGljYXRvciIsImNsaWVudF9pZCI6IjNiZGJhM2M1NDg5N' +
  'zVhMzQ1NmJkY2RhYmU5YjMxZGIxOWQyNDI0M2JmNWQyNDE4YmNhOGVjOTRmYjA' +
  '0YjQ3ZTUzNTJhZGE4ZGQ3MzJjNjM2YTU0OWI5ZDJiMWM4YWYxYWI3MTBhYjdiM' +
  'mZmM2NkM2M2NTdmYTQzNmU3MjllNzFiIiwidXNlcl9pZCI6IjAxREM4TVNTWVB' +
  'YOEJSODhKUlJWWkZWWlRUIiwiZW1haWwiOiJ0b2Z1QGV4YW1wbGUuY29tIiwic' +
  'GhvbmVfbnVtYmVyIjoiIiwic3RhdGUiOiJwcmVfYXV0aG9yaXplZCJ9.3lNrCb' +
  'v7IGy_pi7PqI1IOn3j4wYD-aA7hHKS_lb143YCN0giUPjhWP893oZcu0RNHByP' +
  '05H2CpbdStFatLLVnA';

describe('LoginVerify Actions Test', (): void => {
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

  test('dispatches error on code verification request', async (): Promise<void> => {
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

  test('dispatches success on code verification', async (): Promise<void> => {
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
      { type: REQUEST_SUCCESS },
    ]);
  });

  test('dispatches success for verified device', async (): Promise<void> => {
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
      { type: REQUEST_SUCCESS },
    ]);
  });

  test('dispatches error on navigator credentials retrieval', async (): Promise<void> => {
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
