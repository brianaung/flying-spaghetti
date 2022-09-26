<<<<<<< HEAD
import * as api from '../api/index.js';
import { FETCH_ALL } from '../constants/actionTypes';
=======
import * as api from '../api/photos.js';
import {FETCH_ALL} from '../constants/actionTypes'
>>>>>>> a8b6226 (get folders and photos)

export const getPhotos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPhotos();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
