import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';

let middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middlewares = [...middlewares, logger]
}

const initialState = {};

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));


export default store;