import * as api from '../api/auth';
import { LOGIN } from '../constants/actionTypes';

export const userLogin = (email, password, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userLogin({email, password});
    dispatch({ type: LOGIN, payload: data });
    navigate('/dashboard/folders');
  } catch (error) {
    console.log(error.message);
  }
};