import { API_BASE_URL } from '../config'
import { push } from 'react-router-redux';

const initialState = {
    isLoggedIn: false,
    secretWord: ''
}

export const LOGIN_FINISHED = 'LOGIN_FINISHED';
export const loginFinished = (cred) => ({
    type: LOGIN_FINISHED,
    payload: cred
})

//reducxcer check for type ofaction, check payload for the state which is okay, then isloggedin:true, then compnent will render data based on state

export const loginReducer = (state = initialState, action) => {
    if (action.type === LOGIN_FINISHED) {
        console.log(action.payload) 
        state = Object.assign({}, state, {
            secretWord:action.payload
        })
        console.log(state);
        return state;
    }
    return state;
}

export const login = (data) => (dispatch) => {
    console.log("login credentials", data)
    fetch('http://localhost:8080/api/users/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)      //username, password
    }).then(res => {
        //json info in here from server
        // console.log(res.json());
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        res.json().then((data) => {
            dispatch(loginFinished(data.status));
        })
    })
}