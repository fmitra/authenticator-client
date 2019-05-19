import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import signup from '@authenticator/signup/reducer';
import signupVerify from '@authenticator/signupVerify/reducer';

const reducers = combineReducers({
  signup,
  signupVerify,
});

export default createStore(reducers, applyMiddleware(thunk));
