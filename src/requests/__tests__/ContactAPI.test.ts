import fetchMock from 'fetch-mock';

import { ContactAPI } from '@authenticator/requests';
import config from '@authenticator/config';

describe('ContactAPI Test', (): void => {
  afterEach((): void => {
    fetchMock.restore();
  });

  test('checks unverified address', async(): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/contact/check-address`;
    fetchMock.mock(url, {
      status: 202,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    const response = await ContactAPI.checkAddress({
      deliveryMethod: 'phone',
      address: '+15555555555',
    });
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({
      token: 'jwt-token',
      clientID: 'client-id',
    });
  });

  test('disables an address', async(): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/contact/disable`;
    fetchMock.mock(url, {
      status: 200,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    const response = await ContactAPI.disable({
      deliveryMethod: 'phone',
    });
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({
      token: 'jwt-token',
      clientID: 'client-id',
    });
  });

  test('removes an address', async(): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/contact/remove`;
    fetchMock.mock(url, {
      status: 200,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    const response = await ContactAPI.remove({
      deliveryMethod: 'phone',
    });
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({
      token: 'jwt-token',
      clientID: 'client-id',
    });
  });

  test('verifies an address', async(): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/contact/verify`;
    fetchMock.mock(url, {
      status: 200,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    const response = await ContactAPI.verify({
      code: '444444',
      isDisabled: false,
    });
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({
      token: 'jwt-token',
      clientID: 'client-id',
    });
  });

  test('sends an OTP code', async(): Promise<void> => {
    const url = `${config.api.baseURL}/api/v1/contact/send`;
    fetchMock.mock(url, {
      status: 202,
      body: {
        token: 'jwt-token',
        clientID: 'client-id',
      },
    });

    const response = await ContactAPI.send({
      deliveryMethod: 'phone',
    });
    expect(response.ok).toBe(true);
    expect(response.resultSuccess).toEqual({
      token: 'jwt-token',
      clientID: 'client-id',
    });
  });
});
