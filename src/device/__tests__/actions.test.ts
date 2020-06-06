import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import config from '@authenticator/config';
import { registerDevice } from '@authenticator/device/actions';
import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '@authenticator/device/constants';

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

describe('Device Actions Credential Registration Test', (): void => {
  let storeMock: any;
  let credentialsMock: any;

  beforeEach((): void => {
    const middlewares = [ thunk ];
    const mockStore = configureMockStore(middlewares);
    storeMock = mockStore({});
    credentialsMock = {
      create: (options: any): Promise<any> => {
        throw new Error('whoops!');
      },
      get: jest.fn(),
      store: jest.fn(),
      preventSilentAccess: jest.fn(),
      requireUserMediation: jest.fn(),
    };
  });

  afterEach((): void => {
    fetchMock.restore();
  });

  test('dispatches error on device initialization request', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/device`;
    fetchMock.mock(url, {
      status: 400,
      body: {
        error: {
          message: 'Invalid domain',
          code: 'webauthn',
        },
      },
    });

    await storeMock.dispatch(registerDevice(credentialsMock));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        message: 'Invalid domain',
        code: 'webauthn',
      }},
    ]);
  });

  test('dispatches error on navigator credentials creation', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/device`;
    fetchMock.mock(url, {
      status: 200,
      body: mockInitDeviceResponse,
    });

    await storeMock.dispatch(registerDevice(credentialsMock));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'credentials_dom_error',
        message: 'whoops!',
      }},
    ]);
  });

  test('dispatches default error on navigator credentials creation', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/device`;
    fetchMock.mock(url, {
      status: 200,
      body: mockInitDeviceResponse,
    });

    credentialsMock.create = (options: any): Promise<any> => {
      throw 'whoops!';
    }

    await storeMock.dispatch(registerDevice(credentialsMock));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'credentials_dom_error',
        message: 'We couldn\'t register your device. Please check that your device is in use',
      }},
    ]);
  });

  test('dispatches error on on null credential creation respons', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/device`;
    fetchMock.mock(url, {
      status: 200,
      body: mockInitDeviceResponse,
    });

    credentialsMock.create = (options: any): Promise<any> => {
      return Promise.resolve(null);
    };

    await storeMock.dispatch(registerDevice(credentialsMock));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'credentials_dom_error',
        message: 'We couldn\'t register your device. Please try again later',
      }},
    ]);
  });

  test('dispatches error device verification failure', async (): Promise<void> => {
    const initURL = `${config.api.baseURL}/api/v1/device`;
    const verifyURL = `${config.api.baseURL}/api/v1/device/verify`;
    fetchMock.mock(initURL, {
      status: 200,
      body: mockInitDeviceResponse,
    });
    fetchMock.mock(verifyURL, {
      status: 400,
      body: {
        error: {
          message: 'Invalid domain',
          code: 'webauthn',
        },
      },
    });

    credentialsMock.create = (options: any): Promise<any> => {
      return Promise.resolve({
        id: 'credentialID',
        rawID: new ArrayBuffer(0),
        response: {
          attestationObject: new ArrayBuffer(0),
          clientDataJSON: new ArrayBuffer(0),
        },
        type: 'public-key',
      });
    };

    await storeMock.dispatch(registerDevice(credentialsMock));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        message: 'Invalid domain',
        code: 'webauthn',
      }},
    ]);
  });

  test('dispatches success after verification', async (): Promise<void> => {
    const initURL = `${config.api.baseURL}/api/v1/device`;
    const verifyURL = `${config.api.baseURL}/api/v1/device/verify`;
    fetchMock.mock(initURL, {
      status: 200,
      body: mockInitDeviceResponse,
    });
    fetchMock.mock(verifyURL, {
      status: 201,
      body: {},
    });

    credentialsMock.create = (options: any): Promise<any> => {
      return Promise.resolve({
        id: 'credentialID',
        rawID: new ArrayBuffer(0),
        response: {
          attestationObject: new ArrayBuffer(0),
          clientDataJSON: new ArrayBuffer(0),
        },
        type: 'public-key',
      });
    };

    await storeMock.dispatch(registerDevice(credentialsMock));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_SUCCESS },
    ]);
  });
});
