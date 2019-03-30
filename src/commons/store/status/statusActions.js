import { createAction } from 'redux-actions';

import api from 'commons/api';

/* types */
const GET_STATUS_REQUEST = '@user/GET_STATUS_REQUEST';
const GET_STATUS_SUCCESS = '@user/GET_STATUS_SUCCESS';

export const types = {
  GET_STATUS_REQUEST,
  GET_STATUS_SUCCESS,
};

/* actions */
const updateStatus = createAction(GET_STATUS_SUCCESS);

const getStatus = filter => async dispatch => {
  const res = await api.get('/info');
  const data = await res.data;

  if (data) {
    dispatch(updateStatus(data));
  }
};

export const actions = {
  getStatus,
  updateStatus,
};
