import { API_BASE_URL } from './config'

const initialState = {
    recipeName: '',
    ingredient: ''
}

export const ADD_RECIPE = 'ADD_RECIPE';
export const addRecipe = (recipeName, ingredient) => ({
    type: ADD_RECIPE,
    recipeName,
    ingredient
});

export const GET_RECIPE = 'GET_RECIPE';
export const getRecipe = (recipeName) => ({
    type: GET_RECIPE,
    recipeName
});

export const recipeReducer = (state = initialState, action) => {
    if (action.type === ADD_RECIPE) {
        console.log(action.recipeName);
        console.log(action.ingredient);
        return Object.assign({}, state, {
            recipeName: action.recipeName,
            ingredient: action.ingredient
        });
        if (action.type === GET_RECIPE) {
            return Object.assign({}, state, {
                recipeName: action.recipeName
            });
        }
    }
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
            console.log(res);
            dispatch(getRecipe(res));
        })
        .catch(err => console.log(`error getting recipes ${err}`))
}

// export const updateRecipe = (recipeId) => (dispatch) => {

// }