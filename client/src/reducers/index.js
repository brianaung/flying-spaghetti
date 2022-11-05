import { combineReducers } from 'redux';
import photos from './photos';
import users from './users';
import auth from './auth';
import photo from './photo';
export default combineReducers({
  photos,
  users,
  auth,
  photo
});
