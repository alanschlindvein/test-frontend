import { handleActions } from 'redux-actions';
import { types } from './statusActions';

/* handler */
const initialState = { uptime: new Date(), requests: 0 };

export default handleActions(
  {
    [types.GET_STATUS_SUCCESS]: (state, { payload }) => payload
  },
  initialState
);
