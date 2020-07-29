import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
} from '@authenticator/device/constants';
import { AppError, NullAppError } from '@authenticator/errors';

export interface State {
  error: NullAppError;
  isRequesting: boolean;
  isEnabled: boolean;
}

export interface Action {
  type: string;
  error?: AppError;
}

const defaultState: State = {
  error: null,
  isRequesting: false,
  isEnabled: false,
};

export default (state: State = defaultState, action: Action): State => {
  switch(action.type) {
    case REQUEST: {
      return {
        ...state,
        error: null,
        isEnabled: false,
        isRequesting: true,
      };
    }

    case REQUEST_ERROR: {
      return {
        ...state,
        error: action.error ? action.error : null,
        isEnabled: false,
        isRequesting: false,
      };
    }

    case REQUEST_SUCCESS: {
      return {
        ...state,
        error: null,
        isEnabled: true,
        isRequesting: false,
      };
    }

    default: {
      return { ...state };
    }
  }
};
