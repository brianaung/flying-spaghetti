import { BAN_USER, GET_USERS } from '../constants/actionTypes';

export default (state = { users: []}, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload };
    case BAN_USER:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
