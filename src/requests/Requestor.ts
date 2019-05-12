import store from 'store2';

interface RequestOpt {
  method: string;
  body?: string;
  headers: {[key: string]: string};
}

export interface APIError {
  code: string;
  message: string;
}

export interface APIResponse<T> {
  ok?: boolean;
  status?: number;
  resultSuccess?: T;
  resultError?: APIError;
  requestError?: any;
}

export default class Requestor {
  protected baseURL: string;
  protected prefix: string;

  constructor() {
    this.baseURL = 'http://api.authenticator.local';
    this.prefix = 'api/v1';
  }

  private async makeRequest<T>(request: RequestInfo): Promise<APIResponse<T>> {
    const response: APIResponse<T> = {};

    const onError = (fetchResp: Response): void => {
      response.status = fetchResp.status;
      response.ok = false;
      response.resultError = {
        code: "request_failure",
        message: "Unable to complete request. Please check your connection",
      };
      response.requestError = fetchResp;
    };

    const onSuccess = async (fetchResp: Response): Promise<void> => {
      response.status = fetchResp.status;
      response.ok = fetchResp.ok;

      const body = await fetchResp.json();
      if (response.ok) {
        response.resultSuccess = body;
        return;
      }

      response.resultError = body.error;
    };

    try {
      const resp = await fetch(request);
      onSuccess(resp);
    } catch (e) {
      onError(e);
    }

    if (!response.ok) {
      return Promise.reject(response);
    }

    return Promise.resolve(response);
  }

  protected headers(): {[key: string]: string} {
    // TODO Move to settings
    const tokenName = 'jwt-token';
    const jwt: string = store.get(tokenName);

    const headers: {[key: string]: string} = {
      'Content-Type': 'application/json',
    };

    if (jwt) {
      headers['Authorization'] = `Bearer ${jwt}`;
    }

    return headers;
  }

  protected endpoint(path: string): string {
    return `${this.baseURL}/${this.prefix}/${path}`;
  }

  protected post<T>(url: string, data?: any): Promise<APIResponse<T>> {
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
