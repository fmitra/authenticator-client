import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import config from '@authenticator/config';
import { verify, checkAddress } from '@authenticator/contact/actions';
import {
  REQUEST,
  REQUEST_ERROR,
  VERIFY_CONTACT,
  VERIFIED,
} from '@authenticator/contact/constants';
import { mockToken } from '@authenticator/identity/mock';

describe('Contact Actions: Check Address Test', (): void => {
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
    const url = `${config.api.baseURL}/api/v1/contact/check-address`;
    fetchMock.mock(url, {
      status: 400,
      body: {
        error: {
          message: 'Email address is invalid',
          code: 'invalid_field',
        },
      },
    });

    await storeMock.dispatch(checkAddress({ deliveryMethod: 'email', address: 'invalid' }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'invalid_field',
        message: 'Email address is invalid',
      }},
    ]);
  });

  test('dispatches REQUEST_ERROR on setting token', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/contact/check-address`;
    fetchMock.mock(url, {
      status: 201,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    await storeMock.dispatch(checkAddress({ deliveryMethod: 'email', address: 'jane@example.com' }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'invalid_token',
        message: 'Token is not correctly formatted',
      }},
    ]);
  });

  test('dispatches VERIFY_CONTACT success', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/contact/check-address`;
    fetchMock.mock(url, {
      status: 201,
      body: {
        token: mockToken,
        clientID: 'client-id',
      },
    });

    await storeMock.dispatch(checkAddress({ deliveryMethod: 'email', address: 'jane@example.com' }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: VERIFY_CONTACT },
    ]);
  });
});

describe('ContactVerify Actions: Verify Test', (): void => {
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
    const url = `${config.api.baseURL}/api/v1/contact/verify`;
    fetchMock.mock(url, {
      status: 400,
      body: {
        error: {
          message: 'Code is invalid',
          code: 'invalid_code',
        },
      },
    });

    await storeMock.dispatch(verify({ code: '123456', isDisabled: false }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'invalid_code',
        message: 'Code is invalid',
      }},
    ]);
  });

  test('dispatches error on setting token', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/contact/verify`;
    fetchMock.mock(url, {
      status: 201,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    await storeMock.dispatch(verify({ code: '123456', isDisabled: false }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: REQUEST_ERROR, error: {
        code: 'invalid_token',
        message: 'Token is not correctly formatted',
      }},
    ]);
  });

  test('dispatches success', async (): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/contact/verify`;
    fetchMock.mock(url, {
      status: 201,
      body: {
        token: mockToken,
        clientID: 'client-id',
      },
    });

    await storeMock.dispatch(verify({ code: '123456', isDisabled: false }));
    expect(storeMock.getActions()).toEqual([
      { type: REQUEST },
      { type: VERIFIED },
    ]);
  });
});
