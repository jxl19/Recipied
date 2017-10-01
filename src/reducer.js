import { API_BASE_URL } from './config'

const initialState = {
    recipeName: '',
    ingredient: '',
    recipes: [],
    loadTo: '',
    isLoggedIn: false,
    id: '',
    idSet: false,
    recipeData: '',
    added: false,
    username: '',
    userData: [],
    delRecipe: false,
    clicked: false
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

export const ADD_FINISHED = 'ADD_FINISHED';
export const addFinished = (data) => ({
    type: ADD_FINISHED,
    payload: data
})

export const GET_RECIPE = 'GET_RECIPE';
export const getRecipe = (recipeName) => ({
    type: GET_RECIPE,
    payload: recipeName
});

export const LOAD_TO = 'LOAD_TO';
export const loadTo = (endpoint) => ({
    type: LOAD_TO,
    payload: endpoint,
});

export const LOGIN_FINISHED = 'LOGIN_FINISHED';
export const loginFinished = (cred) => ({
    type: LOGIN_FINISHED,
    payload: cred
})

export const GET_ID = 'GET_ID';
export const getId = (id) => ({
    type: GET_ID,
    payload: id
})

export const RECIPE_DATA = 'RECIPE_DATA';
export const recipeData = (data) => ({
    type: RECIPE_DATA,
    payload: data
})

export const REMOVE_STATE = 'REMOVE_STATE';
export const removeState = () => ({
    type: REMOVE_STATE
})

export const GET_USER = 'GET_USER';
export const getUser = (data) => ({
    type: GET_USER,
    payload: data
})

export const RECIPE_DELETED = 'RECIPE_DELETED';
export const recipeDeleted = () => ({
    type: RECIPE_DELETED
})

export const DB_CLICKED = 'DB_CLICKED';
export const dbClicked = (data) => ({
    type: DB_CLICKED,
    payload: data
})

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
    if (action.type === REMOVE_STATE) {
        state = Object.assign({}, state, {
            added: false
        })
        return state;
    }
    if (action.type === ADD_FINISHED) {
        console.log(action.payload);
        state = Object.assign({}, state, {
            added: action.payload
        })
        return state;
    }
    if (action.type === GET_RECIPE) {
        console.log(action.payload);
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
    if (action.type === LOAD_TO) {
        console.log(action.payload);
        state = Object.assign({}, state, {
            loadTo: action.payload
        });
        return state;
    }
    if (action.type === LOGIN_FINISHED) {
        console.log(action.payload)
        state = Object.assign({}, initialState, {
            isLoggedIn: true
        })
        return state;
    }
    if (action.type === GET_ID) {
        console.log(action.payload);
        state = Object.assign({}, initialState, {
            id: action.payload,
            idSet: true
        })
        return state;
    }

    if (action.type === RECIPE_DATA) {
        console.log(action.payload);
        state = Object.assign({}, initialState, {
            recipeData: action.payload
        })
        return state;
    }

    if (action.type === GET_USER) {
        console.log(action.payload);
        state = Object.assign({}, initialState, {
            userData: action.payload
        })
        return state;
    }
    if (action.type === RECIPE_DELETED) {
        state = Object.assign({}, initialState, {
            delRecipe: true
        })
        return state;
    }
    if (action.type === DB_CLICKED) {
        state = Object.assign({}, initialState, {
            clicked: action.payload
        })
        return state;
    }
    return state;
};
var token;
export const login = (data) => (dispatch) => {
    console.log("login credentials", data);
    fetch('http://localhost:8080/api/users/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)      //username, password
    }).then(res => {
        //json info in here from server
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        res.json().then((data) => {
            console.log(data);
            console.log(data.authToken);
            token = data.authToken;
            if (token) {
                dispatch(loginFinished(true));
            }
        })
    })
}

export const deleteRecipe = (id) => (dispatch) => {
    fetch(`${API_BASE_URL}/recipes/${id}`,
        {
            method: 'DELETE',
            header: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
           dispatch(recipeDeleted());
           dispatch(getUserName());
        })
        .catch(err => console.log(`${err}`))
}

export const getUserName = () => (dispatch) => {
    fetch(`${API_BASE_URL}/recipes/user`,
        {
            method: 'GET',
            header: {
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
            dispatch(getUser(res));
        })
        .catch(err => console.log(`${err}`))
}

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
            console.log({ recipeName, ingredient });
            dispatch(addRecipe(recipeName, ingredient));
        })
        .then(() => {
            dispatch(addFinished(true));
        })
        .catch(err => console.log(`${err}`))
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
//remember to create the server side code for this get.
//i should dispatch getid somewhere else first so i can render the page then update the page with the data from the api
export const searchRecipe = (id) => (dispatch) => {
    console.log("recipe: ", id);
    fetch(`${API_BASE_URL}/recipes/id/${id}`,
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
            dispatch(recipeData(res));
        })
        .catch(err => console.log(`error getting recipes ${err}`))
}
//-----IN PROGRESS-------
export const updateRecipe = (id) => (dispatch) => {
    console.log("recipe: ", id);
    fetch(`${API_BASE_URL}/recipes/id/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            // dispatch(updateComplete());
        })
        .catch(err => console.log(`${err}`));
}