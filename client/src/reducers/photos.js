<<<<<<< HEAD
import { FETCH_ALL } from '../constants/actionTypes';
export default (photos = [], action) => {
=======
import {
  FETCH_ALL,
} from '../constants/actionTypes';
export default (data = {}, action) => {
>>>>>>> a8b6226 (get folders and photos)
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    default:
      return data;
  }
};
