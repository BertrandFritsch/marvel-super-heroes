// @flow

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import characters from './contexts/characters';

const nodeProcess = typeof process !== 'undefined' && process;
const isTestEnv = nodeProcess && nodeProcess.env.NODE_ENV === 'test';

const sagaMiddleware = createSagaMiddleware();

/**
 * redux middleware -- only the saga middleware used here
 */
const middleware = [sagaMiddleware];

/**
 * Wrap the createStore function to be able to use the REDUX DEVTOOLS in development mode
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const finalCreateStore = !isTestEnv ? composeEnhancers(
  applyMiddleware(...middleware)
)(createStore) : createStore;

/**
 * Create the redux store
 */
const store = finalCreateStore(combineReducers({ characters: characters.reducers }));

/**
 * Start the sagas
 */
if (!isTestEnv) {
  sagaMiddleware.run(characters.sagas);
}

export default store;
