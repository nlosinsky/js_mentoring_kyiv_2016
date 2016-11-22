import { authUserAPI } from '../api';
import * as types from '../constants/actionTypes'

export function authUser(email, password) {
  return {
    type: types.PROMISE,
    actions: [types.USER_AUTHENTICATING, types.USER_AUTHENTICATED, types.USER_AUTHENTICATION_FAILURE],
    promise: authUserAPI(email, password)
  }
}