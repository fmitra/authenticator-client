import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import config from '@authenticator/config';
import { enable, secret } from '@authenticator/totp/actions';
import {
  REQUEST,
  REQUEST_ERROR,
  SECRET_CREATED,
  TOTP_IS_ENABLED,
} from '@authenticator/totp/constants';

describe('TOTP Actions: Secret Test', (): void => {
  let storeMock: any;

  beforeEach((): void => {
    const middlewares = [ thunk ];
    const mockStore = configureMockStore(middlewares);
    storeMock = mockStore({});
  });

  afterEach((): void => {
    fetchMock.restore();
  });

  test('dispatches error on request', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/totp`;
    fetchMock.mock(url, {
      status: 500,
      body: {
        error: {
          message: 'Whoops something bad happened',
          code: 'internal',
        },
      },
    });

    await storeMock.dispatch(secret());
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'internal',
        message: 'Whoops something bad happened',
      }},
    ]);
  });

  test('dispatches totp on success', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/totp`;
    fetchMock.mock(url, {
      status: 200,
      body: { totp: 'otpauth://totp' },
    });

    await storeMock.dispatch(secret());
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: SECRET_CREATED, totp: 'otpauth://totp' },
    ]);
  });
});

describe('TOTP Actions: Enable Test', (): void => {
  let storeMock: any;

  beforeEach((): void => {
    const middlewares = [ thunk ];
    const mockStore = configureMockStore(middlewares);
    storeMock = mockStore({});
  });

  afterEach((): void => {
    fetchMock.restore();
  });

  test('dispatches error on request', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/totp/configure`;
    fetchMock.mock(url, {
      status: 400,
      body: {
        error: {
          message: 'Code is incorrect',
          code: 'invalid_code',
        },
      },
    });

    await storeMock.dispatch(enable({ code: '123456' }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'invalid_code',
        message: 'Code is incorrect',
      }},
    ]);
  });

  test('dispatches enabled notice on request', async (): Promise<void> => {
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
    const url = `${config.api.baseURL}/api/v1/totp/configure`;
    fetchMock.mock(url, {
      status: 200,
      body: {
        token: mockToken,
        clientID: 'client-id',
      },
    });

    await storeMock.dispatch(enable({ code: '123456' }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: TOTP_IS_ENABLED },
    ]);
  });

  test('dispatches error on setting token', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/totp/configure`;
    fetchMock.mock(url, {
      status: 200,
      body: {
        token: 'invalid-token',
        clientID: 'client-id',
      },
    });

    await storeMock.dispatch(enable({ code: '123456' }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'invalid_token',
        message: 'Token is not correctly formatted',
      }},
    ]);
  });
});
