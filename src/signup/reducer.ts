import {
  REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS
} from '@authenticator/signup/constants';

export interface State {
  error: string;
}

export interface Action {
  type: string;
}

const defaultState: State = {
  error: '',
};

export default (state: State = defaultState, action: Action): State => {
  switch(action.type) {
    case REQUEST: {
      return Object.assign({}, state, {
        error: "a request started",
      });
    }

    case REQUEST_ERROR: {
      return Object.assign({}, state, {
        error: "an error occurred",
      });
    }

    case REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        error: "there should be no error",
      });
    }

    default: {
      return Object.assign({}, state);
    }
  }
};
