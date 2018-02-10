import { API_BASE_URL } from '../config'

const initialState = {
    isLoggedIn: false,
    secretWord: ''
}

export const LOGIN_FINISHED = 'LOGIN_FINISHED';
export const loginFinished = (cred) => ({
    type: LOGIN_FINISHED,
    payload: cred
})

export const loginReducer = (state = initialState, action) => {
    if (action.type === LOGIN_FINISHED) {
        state = Object.assign({}, state, {
            secretWord:action.payload
        })
        return state;
    }
    return state;
}

export const login = (data) => (dispatch) => {
    fetch('http://localhost:8080/api/users/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)      //username, password
    }).then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        res.json().then((data) => {
            dispatch(loginFinished(data.status));
        })
    })
}