import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS
} from '@authenticator/signup/constants';

import { APIError } from '@authenticator/requests';

export interface State {
  error: APIError | null;
}

export interface Action {
  type: string;
  error?: APIError;
}

const defaultState: State = {
  error: null,
};

export default (state: State = defaultState, action: Action): State => {
  switch(action.type) {
    case REQUEST: {
      return {
        ...state,
        error: null,
      };
    }

    case REQUEST_ERROR: {
      return {
        ...state,
        error: action.error ? action.error : null,
      };
    }

    case REQUEST_SUCCESS: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return { ...state };
    }
  }
};
