import { FETCH_PHOTO, POST_COMMENT, GET_COMMENTS, START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, comments: [], photo: {} }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_PHOTO:
      return { ...state, photo: action.payload };
    case POST_COMMENT:
      console.log(state);
      state.comments.push(action.payload);
      return { ...state };
    case GET_COMMENTS:
      return { ...state, comments: action.payload };
    default:
      return state;
  }
};
