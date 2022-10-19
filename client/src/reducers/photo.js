import { FETCH_PHOTO, POST_COMMENT, GET_COMMENTS } from '../constants/actionTypes';

export default (state = { comments: [], photo: {} }, action) => {
  switch (action.type) {
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
