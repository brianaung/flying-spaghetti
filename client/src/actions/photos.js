import * as api from '../api/photos';
import {
  END_LOADING,
  FETCH_ALL,
  FETCH_SHARED,
  FETCH_PHOTO,
  FETCH_PHOTOS_IN_FOLDERS,
  START_LOADING,
  MOVE_PHOTO_TO_BIN,
  FETCH_LIKED,
  POST_COMMENT,
  GET_COMMENTS
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

export const getSharedPhotos = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSharedPhotos();
    console.log('SHARED PHOTOS:' + JSON.stringify(data));

    dispatch({ type: FETCH_SHARED, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getLikedPhotos = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchLikedPhotos();

    dispatch({ type: FETCH_LIKED, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPhoto = (id) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
    const { data } = await api.fetchPhoto(id);

    dispatch({ type: FETCH_PHOTO, payload: data });
    // dispatch({ type: END_LOADING });
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
    dispatch({ type: MOVE_PHOTO_TO_BIN, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const postComment = (photoID, newComment) => async (dispatch) => {
  try {
    const { data } = await api.postComment(photoID, newComment);
    console.log(data);
    dispatch({ type: POST_COMMENT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getComments = (photoID) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.getComments(photoID);
    dispatch({ type: GET_COMMENTS, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
