import * as api from '../api/users';
import {
  GET_USERS
} from '../constants/actionTypes';

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: GET_USERS, payload: data });

  } catch(error) {
    console.log(error.message);
  }
}
