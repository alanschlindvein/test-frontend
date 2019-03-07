import { combineReducers } from 'redux';

import { userReducer } from './user';
import { statusReducer } from './status';

export default combineReducers({
  users: userReducer,
  status: statusReducer
});
