import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import config from '@authenticator/config';
import { register, verify } from '@authenticator/signup/actions';
import { VerifyCodeRequest, SignupRequest } from '@authenticator/requests';
import {
  REQUEST,
  REQUEST_ERROR,
  VERIFY_ACCOUNT,
  VERIFIED,
} from '@authenticator/signup/constants';
import { mockToken } from '@authenticator/identity/mock';

describe('Signup Actions: Register Test', (): void => {
  let storeMock: any;
  let signupReq: SignupRequest;

  beforeEach((): void => {
    const middlewares = [ thunk ];
    const mockStore = configureMockStore(middlewares);
    storeMock = mockStore({});
    signupReq = {
      password: 'swordfish',
      identity: 'jane@example.com',
      type: 'email',
    }
  });

  afterEach((): void => {
    fetchMock.restore();
  });

  test('dispatches REQUEST_ERROR on request', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/signup`;
    fetchMock.mock(url, {
      status: 400,
      body: {
        error: {
          message: 'Password must be at least 8 characters.',
          code: 'min_password_length',
        },
      },
    });

    await storeMock.dispatch(register(signupReq));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'min_password_length',
        message: 'Password must be at least 8 characters.',
      }},
    ]);
  });

  test('dispatches REQUEST_ERROR on setting token', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/signup`;
    fetchMock.mock(url, {
      status: 201,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    await storeMock.dispatch(register(signupReq));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'invalid_token',
        message: 'Token is not correctly formatted',
      }},
    ]);
  });

  test('dispatches VERIFY_ACCOUNT on success', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/signup`;
    fetchMock.mock(url, {
      status: 201,
      body: {
        token: mockToken,
        clientID: 'client-id',
      },
    });

    await storeMock.dispatch(register(signupReq));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: VERIFY_ACCOUNT },
    ]);
  });
});

describe('Signup Actions: Verify Test', (): void => {
  let storeMock: any;
  let verifyReq: VerifyCodeRequest;

  beforeEach((): void => {
    const middlewares = [ thunk ];
    const mockStore = configureMockStore(middlewares);
    storeMock = mockStore({});
    verifyReq = {
      code: '012345',
    }
  });

  afterEach((): void => {
    fetchMock.restore();
  });

  test('dispatches REQUEST_ERROR on request', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/signup/verify`;
    fetchMock.mock(url, {
      status: 400,
      body: {
        error: {
          code: 'invalid_code',
          message: 'Code is invalid.',
        },
      },
    });

    await storeMock.dispatch(verify(verifyReq));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'invalid_code',
        message: 'Code is invalid.',
      }},
    ]);
  });

  test('dispatches REQUEST_ERROR on setting token', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/signup/verify`;
    fetchMock.mock(url, {
      status: 201,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    await storeMock.dispatch(verify(verifyReq));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'invalid_token',
        message: 'Token is not correctly formatted',
      }},
    ]);
  });

  test('dispatches VERIFIED on success', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/signup/verify`;
    fetchMock.mock(url, {
      status: 201,
      body: {
        token: mockToken,
        clientID: 'client-id',
      },
    });

    await storeMock.dispatch(verify(verifyReq));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: VERIFIED },
    ]);
  });
});
