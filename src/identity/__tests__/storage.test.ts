import storage, {
  testLocalStorage,
  testSessionStorage,
  testCookieStorage,
  cookieStorage,
} from '@authenticator/identity/storage';

describe('Storage Test', (): void => {
  test('checks for local storage', (): void => {
    expect(testLocalStorage('key', 'value')).toBe(window.localStorage);
  });

  test('checks for local storage', (): void => {
    expect(testSessionStorage('key', 'value')).toBe(window.sessionStorage);
  });

  test('checks for cookie storage', (): void => {
    expect(testCookieStorage('key', 'value')).toBe(cookieStorage);
  });

  test('sets data to default storage', (): void => {
    const s = storage();
    s.setItem('key', 'value');
    expect(s.getItem('key')).toBe('value');
  });
});
