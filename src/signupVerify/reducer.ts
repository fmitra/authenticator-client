import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS
} from '@authenticator/signupVerify/constants';
import { AppError, NullAppError } from '@authenticator/errors';

export interface State {
  error: NullAppError;
  isRequesting: boolean;
  isVerified: boolean;
}

export interface Action {
  type: string;
  error?: AppError;
}

const defaultState: State = {
  error: null,
  isRequesting: false,
  isVerified: false,
};

export default (state: State = defaultState, action: Action): State => {
  switch(action.type) {
    case REQUEST: {
      return {
        ...state,
        error: null,
        isRequesting: true,
        isVerified: false,
      };
    }

    case REQUEST_ERROR: {
      return {
        ...state,
        error: action.error ? action.error : null,
        isRequesting: false,
        isVerified: false,
      };
    }

    case REQUEST_SUCCESS: {
      return {
        ...state,
        error: null,
        isRequesting: false,
        isVerified: true,
      };
    }

    default: {
      return { ...state };
    }
  }
};
