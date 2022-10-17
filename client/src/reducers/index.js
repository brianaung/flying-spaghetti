import { combineReducers } from 'redux';
import photos from './photos';
import auth from './auth';
import photo from './photo';
export default combineReducers({
  photos,
  auth,
  photo
});
