import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {recipeReducer} from './reducer';

export const history = createHistory();

const middleware = [
    thunk,
    routerMiddleware(history)
];

export default createStore(recipeReducer, applyMiddleware(...middleware));

