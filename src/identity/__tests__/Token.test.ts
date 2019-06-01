import store from 'store2';
import Token from '@authenticator/identity/Token';
import config from '@authenticator/config';

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

jest.mock('store2', (): any => ({
  get: jest.fn().mockReturnValue('jwt-token'),
  set: jest.fn(),
}));

describe('Token Test', (): void => {
  test('sets a token to storage', (): void => {
    Token.set(mockToken);
    expect(store.set).toHaveBeenCalledWith(config.token.name, mockToken);
  });

  test('parses an expiration date', (): void => {
    Token.set(mockToken);
    expect(Token.expiresAt).toEqual(new Date('2019-06-01T04:49:41.000Z'));
  });

  test('retrieves token values', (): void => {
    const clientID = '3bdba3c548975a3456bdcdabe9b31db19d24243bf5d2418' +
      'bca8ec94fb04b47e5352ada8dd732c636a549b9d2b1c8af1ab710ab7b2ff3c' +
      'd3c657fa436e729e71b'

    Token.set(mockToken);
    expect(Token.jti).toBe('01DC8MST0YEHVEHJCJNAT76X1V');
    expect(Token.token).toBe('jwt-token');
    expect(Token.issuer).toBe('authenticator');
    expect(Token.userID).toBe('01DC8MSSYPX8BR88JRRVZFVZTT');
    expect(Token.clientID).toBe(clientID);
    expect(Token.email).toBe('tofu@example.com');
    expect(Token.phoneNumber).toBe('');
    expect(Token.state).toBe('pre_authorized');
  });
});
