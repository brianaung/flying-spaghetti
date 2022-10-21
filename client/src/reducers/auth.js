import { END_LOADING, LOGIN, START_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: false, user: {} }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case LOGIN:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
