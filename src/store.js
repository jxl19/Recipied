import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import {recipeReducer} from './reducers/reducer';
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const middleware = [
    thunk,
    routerMiddleware(history)
];

export default createStore(recipeReducer, applyMiddleware(...middleware));

