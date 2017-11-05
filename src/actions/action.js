export const SEND_RECIPE = 'SEND_RECIPE';
export const sendRecipe = (recipeName) => ({
    type: SEND_RECIPE,
    payload: recipeName
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