import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import promiseMiddleware from './middleware/promise';

let reducer = combineReducers(reducers);
let createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

export const store = createStoreWithMiddleware(reducer, {
  user: {}
});