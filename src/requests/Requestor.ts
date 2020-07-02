import config from '@authenticator/config';
import Token from '@authenticator/identity/Token';
import { AppError } from '@authenticator/errors';

interface RequestOpt {
  method: string;
  body?: string;
  credentials?: 'same-origin' | 'omit' | 'include';
  headers: {[key: string]: string};
}

export interface APIResponse<T> {
  ok?: boolean;
  status?: number;
  resultSuccess?: T;
  resultError?: AppError;
  requestError?: any;
}

export default class Requestor {
  protected baseURL: string;
  protected prefix: string;

  constructor() {
    this.baseURL = config.api.baseURL;
    this.prefix = 'api/v1';
  }

  private async makeRequest<T>(request: RequestInfo): Promise<APIResponse<T>> {
    const response: APIResponse<T> = {};

    const onError = (fetchResp: Response): void => {
      response.status = fetchResp.status;
      response.ok = false;
      response.resultError = {
        code: 'request_failure',
        message: 'Unable to complete request. Please try again later.',
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
      await onSuccess(resp);
    } catch (e) {
      onError(e);
    }

    if (!response.ok) {
      return Promise.reject(response);
    }

    return Promise.resolve(response);
  }

  protected headers(): {[key: string]: string} {
    const jwt: string = Token.token;

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
      credentials: 'same-origin',
    }

    if (data) {
      opts['body'] = JSON.stringify(data);
    }

    return this.makeRequest<T>(new Request(url, opts))
  }

  protected del<T>(url: string, data?: any): Promise<APIResponse<T>> {
    const opts: RequestOpt = {
      method: 'DELETE',
      headers: this.headers(),
      credentials: 'same-origin',
    }

    if (data) {
      opts['body'] = JSON.stringify(data);
    }

    return this.makeRequest<T>(new Request(url, opts))
  }

  protected get<T>(url: string): Promise<APIResponse<T>> {
    const opts: RequestOpt = {
      method: 'GET',
      headers: this.headers(),
      credentials: 'same-origin',
    }

    return this.makeRequest<T>(new Request(url, opts))
  }
}
