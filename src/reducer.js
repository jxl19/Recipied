import { API_BASE_URL } from './config'
import { push } from 'react-router-redux';
//amazons3, imageurl uploaded to s3
//function to take img, send to s3
//or how to upload img from html/js - post req with binary content,etc
//add step function
//TODO:
//create first page(login page) - when successfully loggedin, takes to homepage
//homepage should have menubar to search or create, making them clickable
const initialState = {
    recipeName: '',
    ingredient: '',
    recipes: [],
    loadTo: '',
}

export const SEND_RECIPE = 'SEND_RECIPE';
export const sendRecipe = (recipeName) => ({
    type: SEND_RECIPE,
    recipeName
})

export const ADD_RECIPE = 'ADD_RECIPE';
export const addRecipe = (recipeName, ingredient) => ({
    type: ADD_RECIPE,
    recipeName,
    ingredient
});

export const GET_RECIPE = 'GET_RECIPE';
export const getRecipe = (recipeName) => ({
    type: GET_RECIPE,
    payload: recipeName
});

export const LOAD_RECIPE = 'LOAD_RECIPE';
export const loadRecipe = (recipeName) => ({
    type: LOAD_RECIPE,
    recipeName,
});


export const recipeReducer = (state = initialState, action) => {
    if (action.type === ADD_RECIPE) {
        console.log(action.recipeName);
        console.log(action.ingredient);
        state = Object.assign({}, state, {
            recipeName: action.recipeName,
            ingredient: action.ingredient
        });
        return state;
    }
    if (action.type === GET_RECIPE) {
        console.log(action.payload);
        // console.log(action.ingredient);
        //action.recipe name is the whoe payload... 
        state = Object.assign({}, state, {
            recipes: action.payload
        });
        return state;

    }
    if (action.type === SEND_RECIPE) {
        console.log(action.recipeName);
        state = Object.assign({}, state, {
            recipeName: action.recipeName
        });
        return state;
    }
    if (action.type === LOAD_RECIPE) {
        console.log(action.recipeName);
        state = Object.assign({}, state, {
            loadTo: action.recipeName
        });
        return state;
    }
    return state;
};

export const submitRecipe = (recipeName, ingredient) => (dispatch) => {
    console.log("ATTRIBUTES ", recipeName, ingredient);
    fetch(`${API_BASE_URL}/recipes`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dishName: recipeName,
                ingredients: ingredient
            }),
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(res => {
            console.log({ recipeName, ingredient })
            dispatch(addRecipe(recipeName, ingredient))
        })
}

export const getReciped = (recipeName) => (dispatch) => {
    console.log("ATTRIBUTES ", recipeName);
    fetch(`${API_BASE_URL}/recipes/get/${recipeName}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(res => {
            console.log(res)
            dispatch(getRecipe(res));
        })
        .catch(err => console.log(`error getting recipes ${err}`))
}

// export const updateRecipe = (recipeId) => (dispatch) => {

// }