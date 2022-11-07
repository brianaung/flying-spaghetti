import * as api from '../api/users';
import {
  GET_USERS,
  BAN_USER
} from '../constants/actionTypes';

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: GET_USERS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const banUser = (userList) => async (dispatch) => {
  try {
    await api.banUser(userList);
    console.log("FOO");
    const { data } = await api.getAllUsers();
    dispatch({ type: BAN_USER, payload: data });
  } catch (error) {
    console.log(error.message);
  }
}