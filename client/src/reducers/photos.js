import {
  FETCH_ALL, FETCH_PHOTO, START_LOADING, END_LOADING
} from '../constants/actionTypes';
export default (state = { isLoading: true, data: {}} , action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return action.payload
    case FETCH_PHOTO:
      return action.payload;
    default:
      return state;
  }
};
