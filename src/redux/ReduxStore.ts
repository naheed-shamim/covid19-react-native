import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import { logger } from 'redux-logger';
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();
export const ReduxStore = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
  // applyMiddleware(sagaMiddleware, logger)
);
sagaMiddleware.run(rootSaga);