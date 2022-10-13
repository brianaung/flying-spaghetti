import {
  FETCH_ALL,
  FETCH_PHOTO,
  START_LOADING,
  END_LOADING,
  FETCH_PHOTOS_IN_FOLDERS,
  MOVE_PHOTO_TO_BIN
} from '../constants/actionTypes';
export default (state = { isLoading: true, photos: [], folders: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return { ...state, photos: action.payload.photos, folders: action.payload.folders };
    case FETCH_PHOTO:
      return action.payload;
    case FETCH_PHOTOS_IN_FOLDERS:
      return { ...state, photos: action.payload };
    case MOVE_PHOTO_TO_BIN:
      return {
        ...state,
        photos: state.photos.filter((photo) => photo.photoID !== action.payload.photoID)
      };
    default:
      return state;
  }
};
