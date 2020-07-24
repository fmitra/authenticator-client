import { createStore, applyMiddleware, combineReducers } from 'redux';
import {
  syncHistoryWithStore,
  routerReducer,
  routerMiddleware,
} from 'preact-router-redux'
import { createBrowserHistory } from 'history';

import thunk from 'redux-thunk';

import login from '@authenticator/login/reducer';
import signup from '@authenticator/signup/reducer';
import device from  '@authenticator/device/reducer';
import totp from '@authenticator/totp/reducer';
import totpDisable from '@authenticator/totpDisable/reducer';
import contact from '@authenticator/contact/reducer';

const browserHistory = createBrowserHistory();

const reducers = combineReducers({
  contact,
  totp,
  totpDisable,
  device,
  signup,
  login,
  routing: routerReducer,
});

const store = createStore(reducers, applyMiddleware(
  thunk,
  routerMiddleware(browserHistory),
));

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
