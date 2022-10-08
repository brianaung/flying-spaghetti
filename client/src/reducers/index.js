import { combineReducers } from 'redux';
import photos from './photos';
import auth from './auth';
export default combineReducers({
  photos,
  auth
});
