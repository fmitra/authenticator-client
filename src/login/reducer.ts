import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  VERIFY_ACCOUNT,
  VERIFIED,
  SUBMIT_IDENTITY,
} from '@authenticator/login/constants';
import { AppError, NullAppError } from '@authenticator/errors';

export interface State {
  error: NullAppError;
  isRequesting: boolean;
  needAccountDetails: boolean;
  needVerification: boolean;
}

export interface Action {
  type: string;
  error?: AppError;
}

export const defaultState: State = {
  error: null,
  isRequesting: false,
  needAccountDetails: true,
  needVerification: false,
};

export default (state: State = defaultState, action: Action): State => {
  switch(action.type) {
    case REQUEST: {
      return {
        ...state,
        error: null,
        isRequesting: true,
      };
    }

    case REQUEST_ERROR: {
      return {
        ...state,
        error: action.error ? action.error : null,
        isRequesting: false,
      };
    }

    case REQUEST_SUCCESS: {
      return {
        ...state,
        error: null,
        isRequesting: false,
      }
    }

    case VERIFY_ACCOUNT: {
      return {
        ...state,
        error: null,
        isRequesting: false,
        needAccountDetails: false,
        needVerification: true,
      };
    }

    case SUBMIT_IDENTITY: {
      return {
        ...state,
        error: null,
        isRequesting: false,
        needAccountDetails: true,
        needVerification: false,
      };
    }

    case VERIFIED: {
      return {
        ...state,
        error: null,
        isRequesting: false,
        needAccountDetails: false,
        needVerification: false,
      };
    }

    default: {
      return { ...state };
    }
  }
};
