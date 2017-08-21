import {SubmissionError} from 'redux-form';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const submitRecipe = recipe => dispatch => {
    return fetch(`${API_BASE_URL}/recipes`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(recipe)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(json => resolvedAddRecipe(json))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

export const resolvedAddRecipe = data => {
    return {
        type: 'ADD_RECIPE',
        data: data
    }
}

export const ADD_RECIPE = 'ADD_RECIPE';
export const addRecipe = (recipe) => ({
    type: ADD_RECIPE,
    recipe
});

