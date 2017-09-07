import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, push } from 'react-router-redux';
import {recipeReducer} from './reducer';

import {createBrowserHistory} from 'history';

const history = createBrowserHistory()

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

