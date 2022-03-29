import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducre from './reducers';

const intialState = {};
const middleware = [thunk];

let store;
try {
    store = createStore(
        rootReducre,
        intialState,
        compose(applyMiddleware(...middleware)));
} catch (error) {
    store = createStore(
        rootReducre,
        intialState,
        compose(applyMiddleware(...middleware)));
}

export default store;