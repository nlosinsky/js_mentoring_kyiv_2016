import * as types from '../constants/actionTypes';

export default function(user = {}, action) {
  switch(action.type) {
    case types.USER_AUTHENTICATED:
      return action.data.user;
    case types.USER_AUTHENTICATION_FAILURE:
      return {error: action.error};
    default:
      return user;
  }
}