import {
  REQUEST,
  REQUEST_ERROR,
  SECRET_CREATED,
  TOTP_IS_ENABLED,
} from '@authenticator/totp/constants';
import { AppError, NullAppError } from '@authenticator/errors';

export interface State {
  error: NullAppError;
  totp: string;
  isRequesting: boolean;
  isEnabled: boolean;
}

export interface Action {
  type: string;
  totp?: string;
  error?: AppError;
}

const defaultState: State = {
  error: null,
  totp: '',
  isRequesting: false,
  isEnabled: false,
};

export default (state: State = defaultState, action: Action): State => {
  switch(action.type) {
    case REQUEST: {
      return {
        ...state,
        error: null,
        isRequesting: true,
        isEnabled: false,
      };
    }

    case REQUEST_ERROR: {
      return {
        ...state,
        error: action.error ? action.error : null,
        isRequesting: false,
        isEnabled: false,
      };
    }

    case SECRET_CREATED: {
      return {
        ...state,
        totp: action.totp ? action.totp : '',
        error: null,
        isRequesting: false,
        isEnabled: false,
      };
    }

    case TOTP_IS_ENABLED: {
      return {
        ...state,
        error: null,
        isRequesting: false,
        isEnabled: true,
      }
    }

    default: {
      return { ...state };
    }
  }
};
