export interface StorageAPI {
  setItem: { (k: string, v: string): void };
  getItem: { (k: string): string | null };
}

/**
 * Fallback storage if browser storage is not available.
 *
 * Falling back to InMemoryStoraage allows the app
 * to run without failing due to privacy or
 * permission properties configured on the browser.
 */
class InMemoryStorage {
  private db: {[key: string]: string} = {};

  setItem(k: string, v: string): void {
    this.db[k] = v;
  }

  getItem(k: string): string | null {
    return this.db[k] || null;
  }
}

/**
 * An adapter to expose browser cookie access.
 *
 * We wrap the cookie storage API under a similar
 * interface to localStorage and sessionStorage
 * to ensure consistent access.
 */
export const cookieStorage = {
  setItem: (k: string, v: string): void => {
    document.cookie = `${k}=${v}`;
  },

  getItem: (k: string): string | null => {
    const cookieStr: string | undefined = document.cookie
      .split('; ')
      .find((x: string): boolean  => x.startsWith(k));
    if (!cookieStr) {
      return null;
    }

    const split = cookieStr.split('=');
    if (split.length !== 2) {
      return null;
    }

    return split[1];
  }
}

/**
 * Checks if localStorage is available on the browser.
 */
export const testLocalStorage = (k: string, v: string): StorageAPI | null => {
  window.localStorage.setItem(k, v);
  if (v === window.localStorage.getItem(k)) {
    window.localStorage.removeItem(v);
    return window.localStorage;
  }
  return null;
}

/**
 * Checks if sessionStorage is available on the browser.
 */
export const testSessionStorage = (k: string, v: string): StorageAPI | null => {
  window.sessionStorage.setItem(k, v);
  if (v === window.sessionStorage.getItem(k)) {
    window.sessionStorage.removeItem(v);
    return window.sessionStorage;
  }
  return null;
}

/**
 * Checks if cookies can be set on the browser.
 */
export const testCookieStorage = (k: string, v: string): StorageAPI | null => {
  document.cookie = `${k}=${v}`;
  if (document.cookie.includes(`${k}=${v}`)) {
    document.cookie = `${k}=${v}; max-age=0`;
    return cookieStorage;
  }
  return null;
}

/**
 * A convenience function to ensure we can store tokens.
 *
 * Tokens are stored in localStorage and fallback to sessionStorage
 * and cookies. If we are unable to set any data on the browser
 * we fall back to an in-memory object to ensure that misc browser
 * privacy/permission settings do not cause the app to
 * malfunction.
 */
const storage = (): StorageAPI => {
  const k = 'key';
  const v = 'value';

  const storages = [testLocalStorage, testSessionStorage, testCookieStorage];

  for (let i = 0; i < storages.length; i++) {
    const testStorage = storages[i];
    try {
      const storage: StorageAPI | null = testStorage(k, v);
      if (storage) {
        return storage
      }
    } catch (e) {
      // storage is not available, keep trying
    }
  }

  return new InMemoryStorage();
};

export default storage;
