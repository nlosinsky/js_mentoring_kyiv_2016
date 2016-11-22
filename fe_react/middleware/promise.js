import * as types from '../constants/actionTypes';

const middleware = store => next => action => {
  if (action.type !== types.PROMISE) {
    return next(action);
  }

  store.dispatch({
    type: types.USER_AUTHENTICATING
  });

  action.promise.then((data) => {
    store.dispatch({
      type: types.USER_AUTHENTICATED,
      data
    });
  }, (error) => {
    store.dispatch({
      type: types.USER_AUTHENTICATION_FAILURE,
      error
    })
  })

};

export default middleware;