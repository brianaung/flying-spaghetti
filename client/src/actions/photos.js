import * as api from '../api/photos';
import { FETCH_ALL } from '../constants/actionTypes';

export const getPhotos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPhotos();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
