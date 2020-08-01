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
  ok: boolean;
  status: number;
  resultSuccess: T;
}

export interface APIErrorResponse {
  ok: boolean;
  status: number;
  resultError: AppError;
  requestError: string;
}

export default class Requestor {
  protected baseURL: string;
  protected prefix: string;

  constructor() {
    this.baseURL = config.api.baseURL;
    this.prefix = 'api/v1';
  }

  private async makeRequest<T>(request: RequestInfo): Promise<APIResponse<T>> {
    const onError = async (fetchResp: Response): Promise<APIErrorResponse> => {
      let errorResponse: AppError;
      const defaultError: AppError = {
        code: 'request_failure',
        message: 'Unable to complete request. Please try again later.',
      }
      try {
        const body = await fetchResp.json();
        errorResponse = body.error;
      } catch(e) {
        errorResponse = defaultError;
      }

      const error: APIErrorResponse = {
        ok: false,
        status: fetchResp.status,
        resultError: errorResponse,
        requestError: fetchResp.statusText,
      };

      return error;
    };

    const onSuccess = async (fetchResp: Response): Promise<APIResponse<T>> => {
      if (!fetchResp.ok) {
        throw(fetchResp);
      }

      const body = await fetchResp.json();
      const response: APIResponse<T> = {
        ok: fetchResp.ok,
        status: fetchResp.status,
        resultSuccess: body,
      };

      return response;
    };

    try {
      const resp = await fetch(request);
      const response = await onSuccess(resp);
      return Promise.resolve(response);
    } catch (e) {
      const error = await onError(e);
      return Promise.reject(error);
    }
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
      credentials: 'include',
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
      credentials: 'include',
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
      credentials: 'include',
    }

    return this.makeRequest<T>(new Request(url, opts))
  }
}
