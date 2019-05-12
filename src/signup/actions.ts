import { ThunkAction } from 'redux-thunk';

import {
  REQUEST,
  REQUEST_SUCCESS
} from '@authenticator/signup/constants';
import { Action, State } from '@authenticator/signup/reducer';

export type Registration = ThunkAction<void, { signup: State }, void, Action>;

export const register = (): Registration => (dispatch): void => {
  dispatch({ type: REQUEST });
  setTimeout((): void => { dispatch({ type: REQUEST_SUCCESS }); }, 2000);
};
