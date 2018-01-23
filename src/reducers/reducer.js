import { API_BASE_URL } from '../config';
import * as actions from '../actions/action';
const initialState = {
    recipeName: '',
    ingredient: '',
    calories: '',
    steps: '',
    recipes: [],
    loadTo: '',
    isLoggedIn: false,
    id: '',
    idSet: false,
    renderToPage: false,
    recipeData: '',
    added: false,
    username: '',
    userData: [],
    delRecipe: false,
    clicked: false,
    ingredientsList: [],
    stepsList: [],
    file: '',
    imagePreviewUrl: '',
    uuid: '',
    token: '',
    loading: false,
    link: '',
    linkCreated: false
}

export const SEND_RECIPE = 'SEND_RECIPE';
export const sendRecipe = (recipeName) => ({
    type: SEND_RECIPE,
    recipeName
})

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

export const RENDER_ID = 'RENDER_ID';
export const renderID = (id) => ({
    type: RENDER_ID,
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

export const ADD_RLIST = 'ADD_RLIST';
export const addRList = (recipe) => ({
    type: ADD_RLIST,
    payload: recipe
});

export const ADD_STEP_LIST = 'ADD_STEP_LIST';
export const addStepList = (step) => ({
    type: ADD_STEP_LIST,
    payload: step
});

export const ADD_FILE = 'ADD_FILE';
export const addFiles = (files) => ({
    type: ADD_FILE,
    payload: files
})

export const ADD_IMG = 'ADD_IMG';
export const addImg = (img) => ({
    type: ADD_IMG,
    payload: img
})

export const SAVE_ID = 'SAVE_ID';
export const saveId = (id) => ({
    type: SAVE_ID,
    payload: id
})

export const LOADING_BAR = 'LOADING';
export const loadingBar = (data) => ({
    type: LOADING_BAR,
    payload: data
})

export const SAVE_BITLY_LINK = 'SAVE_BITLY_LINK';
export const saveBitlyLink = (data) => ({
    type: SAVE_BITLY_LINK,
    payload: data
})

export const recipeReducer = (state = initialState, action) => {
    if (action.type === actions.REMOVE_STATE) {
        state = Object.assign({}, state, {
            added: false
        })
        return state;
    }
    if (action.type === actions.ADD_FINISHED) {
        state = Object.assign({}, state, {
            added: action.payload
        })
        return state;
    }
    if (action.type === actions.GET_RECIPE) {
        console.log(action.payload);
        state = Object.assign({}, state, {
            recipes: action.payload
        });
        return state;
    }
    if (action.type === actions.SEND_RECIPE) {
        state = Object.assign({}, state, {
            recipeName: action.recipeName
        });
        return state;
    }
    if (action.type === actions.LOAD_TO) {
        state = Object.assign({}, state, {
            loadTo: action.payload
        });
        return state;
    }
    if (action.type === actions.LOGIN_FINISHED) {
        state = Object.assign({}, initialState, {
            isLoggedIn: true,
            token: action.payload
        })
        return state;
    }
    if (action.type === actions.GET_ID) {
        state = Object.assign({}, initialState, {
            id: action.payload,
            idSet: true
        })
        return state;
    }
    if (action.type === actions.RENDER_ID) {
        state = Object.assign({}, initialState, {
            id: action.payload,
            renderToPage: true
        })
        return state;
    }
    if (action.type === actions.RECIPE_DATA) {
        state = Object.assign({}, initialState, {
            recipeData: action.payload
        })
        return state;
    }

    if (action.type === actions.GET_USER) {
        state = Object.assign({}, initialState, {
            userData: action.payload
        })
        return state;
    }
    if (action.type === actions.RECIPE_DELETED) {
        state = Object.assign({}, initialState, {
            delRecipe: true
        })
        return state;
    }
    if (action.type === actions.DB_CLICKED) {
        state = Object.assign({}, initialState, {
            clicked: action.payload
        })
        return state;
    }
    if (action.type === actions.ADD_RLIST) {
        state = Object.assign({}, state, {
            ingredientsList: state.ingredientsList.concat(action.payload)
        })
        return state;
    }
    if (action.type === actions.ADD_STEP_LIST) {
        state = Object.assign({}, state, {
            stepsList: state.stepsList.concat(action.payload)
        })
        return state;
    }
    if (action.type === actions.ADD_FILE) {
        state = Object.assign({}, state, {
            file: action.payload
        })
        return state;
    }
    if (action.type === actions.ADD_IMG) {
        state = Object.assign({}, state, {
            imagePreviewUrl: action.payload
        })
        return state;
    }
    if (action.type === actions.SAVE_ID) {
        state = Object.assign({}, state, {
            uuid: action.payload
        })
    }
    if (action.type === actions.LOADING_BAR) {
        state = Object.assign({}, state, {
            loading: action.payload
        })
    }
    if(action.type === actions.SAVE_BITLY_LINK) {
        console.log(action.payload);
        state = Object.assign({}, state, {
            link: action.payload,
            linkCreated: true
        })
        return state;
    }
    return state;
};
var token;
//dispatch an action that puts up a loading bar, then remove loading bar as soon as its over
export const login = (data) => (dispatch) => {
    dispatch(loadingBar(true));
    fetch(`${API_BASE_URL}/users/login`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)      //username, password
    })
        .then(res => {
            //json info in here from server
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            res.json().then((data) => {
                token = data.authToken;
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('id', data.user);
                if (token) {
                    dispatch(loginFinished(token));
                    dispatch(loadingBar(false));
                }
            })
                .then(res => {
                    if (!token) {
                        window.alert('Invalid username or password');
                        dispatch(loadingBar(false));
                    }
                })
        })
}

//will also need to make a sign in page 
export const createUser = (data) => (dispatch) => {
    fetch(`${API_BASE_URL}/users/signup`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            //dispatch action to login
            dispatch(login(data))
        })
}

export const deleteRecipe = (id) => (dispatch) => {
    var userid = sessionStorage.getItem('id');
    fetch(`${API_BASE_URL}/recipes/${id}`,
        {
            method: 'DELETE',
            header: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            dispatch(recipeDeleted());
            dispatch(getUserName(userid));
        })
        .catch(err => console.log(`${err}`))
}
//gets recipes made by user
export const getUserName = (user_id) => (dispatch) => {
    fetch(`${API_BASE_URL}/recipes/user/${user_id}`,
        {
            method: 'GET',
            header: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(res => {
            dispatch(getUser(res));
        })
        .catch(err => console.log(`${err}`))
}

export const submitRecipe = (recipeName, ingredient, calories, steps, uuid, userid) => (dispatch) => {
    fetch(`${API_BASE_URL}/recipes`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dishName: recipeName,
                ingredients: ingredient,
                calories: calories,
                steps: steps,
                image: uuid,
                userid: userid
            }),
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(() => {
            dispatch(addFinished(true));
        })
        .catch(err => console.log(`${err}`))
}

export const getReciped = (recipeName) => (dispatch) => {
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
            dispatch(getRecipe(res));
        })
        .catch(err => console.log(`error getting recipes ${err}`))
}

export const getAllRecipes = () => (dispatch) => {
    fetch(`${API_BASE_URL}/recipes/all`,
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
export const searchRecipe = (id) => (dispatch) => {
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
            dispatch(recipeData(res));
        })
        .catch(err => console.log(`error getting recipes ${err}`))
}

export const updateRecipe = (ingredient, step, calories, dishName, recipeId, uuid) => (dispatch) => {
    fetch(`${API_BASE_URL}/recipes/${recipeId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: recipeId,
                dishName: dishName,
                ingredients: ingredient,
                calories: calories,
                steps: step,
                image: uuid,
            }),
        })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(() => {
            dispatch(addFinished(true));
        })
        .catch(err => console.log(`${err}`));
}

export const uploadImage = (img) => (dispatch) => {
    let data = new FormData();
    data.append('file', img);
    data.append('name', img.name);
    fetch(`${API_BASE_URL}/upload`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: data
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            dispatch(saveId(data.imageid))
        })
        .catch(err => console.log(`${err}`));
}
//logout to remove sessionstorage
export const logOut = () => (dispatch) => {
    fetch(`${API_BASE_URL}/users/logout`,
        {
            method: 'GET',
        })
        .then(res => {
            sessionStorage.clear();
        })
        .catch(err => console.log(`${err}`));
}

export const createBitlyLink = (link) => (dispatch) => {
    fetch(`https://api-ssl.bitly.com/v3/shorten?access_token=7b1d19e650e64483cd5e26946f576fb2ec4b5197&longUrl=${link}`,
        { method: 'GET' })
        .then(res => {
            console.log(`https://api-ssl.bitly.com/v3/shorten?access_token=7b1d19e650e64483cd5e26946f576fb2ec4b5197&longUrl=${link}`)
            return res.json();
        })
        .then(data => {
            console.log(data);
            console.log(data.data.url)
            dispatch(saveBitlyLink(data.data.url))
        })
        .catch(err => console.log(`${err}`));
}