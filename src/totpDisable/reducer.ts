import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS
} from '@authenticator/totpDisable/constants';
import { AppError, NullAppError } from '@authenticator/errors';

export interface State {
  error: NullAppError;
  isRequesting: boolean;
  isDisabled: boolean;
}

export interface Action {
  type: string;
  error?: AppError;
}

const defaultState: State = {
  error: null,
  isDisabled: false,
  isRequesting: false,
};

export default (state: State = defaultState, action: Action): State => {
  switch(action.type) {
    case REQUEST: {
      return {
        ...state,
        error: null,
        isDisabled: false,
        isRequesting: true,
      };
    }

    case REQUEST_ERROR: {
      return {
        ...state,
        error: action.error ? action.error : null,
        isDisabled: false,
        isRequesting: false,
      };
    }

    case REQUEST_SUCCESS: {
      return {
        ...state,
        error: null,
        isDisabled: true,
        isRequesting: false,
      };
    }

    default: {
      return { ...state };
    }
  }
};
