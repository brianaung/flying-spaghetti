import { FETCH_PHOTO } from '../constants/actionTypes';

export default (photo = {}, action) => {
  switch (action.type) {
    case FETCH_PHOTO:
      return action.payload;
    default:
      return photo;
  }
};
