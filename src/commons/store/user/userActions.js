import { createAction } from 'redux-actions';
import { toast } from 'react-toastify';

import api from 'commons/api';

/* types */
const GET_USERS_REQUEST = '@user/GET_USERS_REQUEST';
const GET_USERS_SUCCESS = '@user/GET_USERS_SUCCESS';

const SAVE_USER_REQUEST = '@user/SAVE_USER_REQUEST';

const UPDATE_USER_SUCCESS = '@user/UPDATE_USER_SUCCESS';
const SAVE_USER_SUCCESS = '@user/SAVE_USER_SUCCESS';

const DELETE_USER_REQUEST = '@user/DELETE_USER_REQUEST';
const DELETE_USER_SUCCESS = '@user/DELETE_USER_SUCCESS';

const UPDATE_FILTER = '@user/UPDATE_FILTER';

export const types = {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  SAVE_USER_REQUEST,
  SAVE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  UPDATE_FILTER
};

/* actions */
const updateUsers = createAction(GET_USERS_SUCCESS);

const addUserToList = createAction(SAVE_USER_SUCCESS);
const updateUserOnList = createAction(UPDATE_USER_SUCCESS);

const deleteUserFromList = createAction(DELETE_USER_SUCCESS);

const updateFilter = createAction(UPDATE_FILTER);

const getUsers = filter => async dispatch => {
  try {
    const res = await api.get('/users');
    const data = await res.data;
  
    if (data) {
      dispatch(updateUsers(data));
    }
  } catch(e) {
    toast.error(e.response.data.message);
  }
};

const updateUser = user => async dispatch => {
  
  try {
    const res = await api.put(`/users/${user.id}`, user);
    const data = await res.data;

    if (data) {
      dispatch(updateUserOnList(data));
    }
  } catch(e) {
    toast.error(e.response.data.message);
  }
};

const saveUser = user => async dispatch => {
  try {
    const res = await api.post('/users', user);
    const data = await res.data;

    if (data) {
      dispatch(addUserToList(data));
    }
  } catch (e) {
    toast.error(e.response.data.message);
  }
};

const deleteUser = id => async dispatch => {
    
  try {
    const res = await api.delete(`/users/${id}`);
    const data = await res.data;

    if (data) {
      dispatch(deleteUserFromList(data));
    }
  } catch (e) {
    toast.error(e.response.data.message);
  }
};

export const actions = {
  getUsers,
  saveUser,
  updateUser,
  deleteUser,
  updateFilter
};
