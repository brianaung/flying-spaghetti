import * as api from '../api/auth';
import { END_LOADING, LOGIN, START_LOADING } from '../constants/actionTypes';

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.userLogin({ email, password });
    dispatch({ type: LOGIN, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
