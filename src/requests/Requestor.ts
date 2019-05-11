import store from 'store2';

interface RequestOpt {
  method: string;
  body?: string;
  headers: {[key: string]: string};
}

export default class Requestor {
  protected baseURL: string;

  constructor() {
    this.baseURL = 'http://api.authenticator.local';
  }

  private makeRequest<T>(request: RequestInfo): Promise<T> {
    return new Promise((resolve) => {
      fetch(request)
    });
  }

  protected headers(): {[key: string]: string} {
    const tokenName = 'jwt-token';
    const jwt: string = store.get(tokenName);

    const headers: {[key: string]: string} = {
      'Content-Type': 'application/json',
    };

    if (jwt) {
      headers['Authorization'] = jwt;
    }

    return headers;
  }

  protected endpoint(path: string): string {
    return `${this.baseURL}/${path}`;
  }

  protected post<T>(url: string, data?: any): Promise<T> {
    const opts: RequestOpt = {
      method: 'POST',
      headers: this.headers(),
    }

    if (data) {
      opts['body'] = JSON.stringify(data);
    }

    return this.makeRequest<T>(new Request(url, opts))
  }
}
