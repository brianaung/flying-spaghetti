import * as api from '../api/photos';
import {
  END_LOADING,
  FETCH_ALL,
  FETCH_PHOTO,
  FETCH_PHOTOS_IN_FOLDERS,
  START_LOADING,
  MOVE_PHOTO_TO_BIN
} from '../constants/actionTypes';

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
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPhoto(id);
    console.log(data);
    dispatch({ type: FETCH_PHOTO, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPhotosInFolder = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPhotosInFolder(id);

    dispatch({ type: FETCH_PHOTOS_IN_FOLDERS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const movePhotoToBin = (folderID, photoID) => async (dispatch) => {
  try {
    const { data } = await api.movePhotoToBin(folderID, photoID);
    console.log(data);
    dispatch({ type: MOVE_PHOTO_TO_BIN, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
