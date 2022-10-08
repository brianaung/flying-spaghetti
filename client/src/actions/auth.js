import * as api from '../api/auth';
import { LOGIN } from '../constants/actionTypes';

export const userLogin = (email, password, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userLogin({email, password});
    console.log(data);
    dispatch({ type: LOGIN, payload: data });
    switch(data.role) {
      case 'user':
        navigate('/dashboard/folders');
        break;
      case 'pending':
        alert('Please wait for the admin to approve your registration');
        localStorage.clear();
        break;
      case 'banned':
        alert('You have been banned from using this service');
        localStorage.clear();
        break;
    }
  } catch (error) {
    console.log(error.message);
  }
};
