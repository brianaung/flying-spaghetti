import {
  FETCH_ALL,
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
    
    case FETCH_PHOTOS_IN_FOLDERS:
      // always return an empty folder since we wont have nested folders in our case
      return { ...state, photos: action.payload, folders: [] };
    case 'UPLOAD_PHOTO':
      state.photos.push(action.payload)
      return {...state};
    case MOVE_PHOTO_TO_BIN:
      return {
        ...state,
        photos: state.photos.filter((photo) => photo.id !== action.payload.id)
      };
    default:
      return state;
  }
};
