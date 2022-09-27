import * as api from '../api/photos';
import { END_LOADING, FETCH_ALL, FETCH_PHOTO, START_LOADING } from '../constants/actionTypes';

export const getPhotos = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPhotos();

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
export const getPhoto = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPhoto(id);

    dispatch({ type: FETCH_PHOTO, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
