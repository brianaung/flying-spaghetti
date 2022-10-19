import { FETCH_PHOTO, POST_COMMENT, GET_COMMENTS } from '../constants/actionTypes';

export default (photo = {}, action) => {
  switch (action.type) {
    case FETCH_PHOTO:
      return action.payload;
    case POST_COMMENT:
      photo.comments.push(action.payload)
      return {...photo};
    case GET_COMMENTS:
      return {...photo};
    default:
      return photo;
  }
};
