import { createStore, applyMiddleware, combineReducers } from 'redux';
import {
  syncHistoryWithStore,
  routerReducer,
  routerMiddleware,
} from 'preact-router-redux'
import { createBrowserHistory } from 'history';

import thunk from 'redux-thunk';

import signup from '@authenticator/signup/reducer';
import signupVerify from '@authenticator/signupVerify/reducer';

const browserHistory = createBrowserHistory();

const reducers = combineReducers({
  signup,
  signupVerify,
  routing: routerReducer,
});

const store = createStore(reducers, applyMiddleware(
  thunk,
  routerMiddleware(browserHistory),
));

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
