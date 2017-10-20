import { API_BASE_URL } from './config'

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
    token: ''
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

export const recipeReducer = (state = initialState, action) => {
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
            isLoggedIn: true,
            token: action.payload
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
    if (action.type === ADD_RLIST) {
        console.log(state.ingredientsList);
        state = Object.assign({}, state, {
            ingredientsList: state.ingredientsList.concat(action.payload)
        })
        return state;
    }
    if(action.type === ADD_STEP_LIST) {
        console.log(state.stepsList);
        state = Object.assign({}, state, {
            stepsList: state.stepsList.concat(action.payload)
        })
        return state;
    }
    if(action.type === ADD_FILE) {
        console.log(action.payload);
        state = Object.assign({}, state, {
            file: action.payload
        })
        return state;
    }
    if(action.type === ADD_IMG) {
        console.log(action.payload);
        state = Object.assign({}, state, {
            imagePreviewUrl: action.payload
        })
        return state;
    }
    if(action.type === SAVE_ID) {
        console.log(action.payload);
        state = Object.assign({}, state, {
            uuid: action.payload
        })
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
    })
    .then(res => {
        //json info in here from server
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        res.json().then((data) => {
            console.log(data.user);
            console.log(data.authToken);
            token = data.authToken;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('id', data.user);
            if (token) {
                dispatch(loginFinished(token));
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

export const getUserName = (userid) => (dispatch) => {
    console.log(userid);
    fetch(`${API_BASE_URL}/recipes/user/${userid}`,
        {
            method: 'GET',
            header: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
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

export const submitRecipe = (recipeName, ingredient, calories, steps, id) => (dispatch) => {
    // console.log("ATTRIBUTES ", recipeName, ingredient, calories, steps, img.name);
    console.log(id);
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
                image: id
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

export const uploadImage = (img)  => (dispatch) => {
    console.log(img);
    let data = new FormData();
    data.append('file', img);
    data.append('name', img.name);

    console.log("imgfile", img.name);
    fetch(`${API_BASE_URL}/upload`,
    {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
        },
        body: data
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data.imageid);
        dispatch(saveId(data.imageid))
    })
    .catch(err => console.log(`${err}`));
}
//logout to remove sessionstorage
export const logOut = () => (dispatch) => {
    fetch(`http://localhost:8080/api/users/logout`,
    {
        method: 'GET',
    })
    .then(res => {
        sessionStorage.clear();
        console.log(res);
    })
    .catch(err => console.log(`${err}`));
}