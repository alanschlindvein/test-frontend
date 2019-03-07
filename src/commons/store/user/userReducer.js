import { handleActions } from 'redux-actions';
import { types } from './userActions';

import { FILTER } from 'commons/constants';

/* selector */
const getFilteredUsers = ({ users }) => {
  const { filter, usersList } = users;

  if(filter === FILTER.ALL) {
    return usersList;
  }

  if(filter === FILTER.IRREGULAR) {
    return usersList.filter(item => item.out)
  }

  return usersList.filter(item => !item.out);
};

export const selectors = {
  getFilteredUsers
};

/* handler */
const initialState = {
  usersList: [],
  filter: 'all'
};

export default handleActions(
  {
    [types.GET_USERS_SUCCESS]: (state, { payload: usersList }) => ({
      ...state, usersList
    }),
    [types.SAVE_USER_SUCCESS]: (state, { payload }) => ({
      ...state,
      usersList: [payload, ...state.usersList],
    }),
    [types.UPDATE_USER_SUCCESS]: (state, { payload }) => ({
      ...state,
      usersList: state.usersList.map(
        item => item.id === payload.id ? payload : item
      )
    }),
    [types.DELETE_USER_SUCCESS]: (state, { payload }) => ({
      ...state,
      usersList: state.usersList.filter(item => item.id !== payload.id)
    }),
    [types.UPDATE_FILTER]: (state, { payload: filter }) => ({
      ...state,
      filter
    })
  },
  initialState
);
