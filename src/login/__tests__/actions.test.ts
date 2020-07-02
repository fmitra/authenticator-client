import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import config from '@authenticator/config';
import { login } from '@authenticator/login/actions';
import routes from '@authenticator/app/routes';
import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '@authenticator/login/constants';

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

  test('dispatches error on request', async (): Promise<void> => {
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

  test('dispatches error on setting token', async (): Promise<void> => {
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

  test('routes to verification on success', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/login`;
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
      { type: REQUEST_SUCCESS },
      {
        payload: {
          args: [
            routes.LOGIN_VERIFY,
          ],
          method: 'push',
        },
        type: '@@router/CALL_HISTORY_METHOD',
      },
    ]);
  });
});
