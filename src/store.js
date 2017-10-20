import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import {recipeReducer} from './reducer';
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const middleware = [
    thunk,
    routerMiddleware(history)
];

// const reducer = combineReducers(
//     {
//         loginReducer,
//         recipeReducer
//     }
// )

export default createStore(recipeReducer, applyMiddleware(...middleware));

