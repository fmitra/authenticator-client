import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import signup from '@authenticator/signup/reducer';

const reducers = combineReducers({
  signup,
});

export default createStore(reducers, applyMiddleware(thunk));
