import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {recipeReducer} from './reducer';

export default createStore(recipeReducer, applyMiddleware(thunk));
