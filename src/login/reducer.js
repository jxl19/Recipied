import { API_BASE_URL } from '../config'
import { push } from 'react-router-redux';

const initialState = {
    isLoggedIn: false
}

const LOGIN_FINISHED = (state, action) => {
    return Object.assign({}, state,
        {
            token: action.payload,
            isLoggedIn: true
        });
}

export const loginFinished = (cred) => ({
    type: LOGIN_FINISHED,
    payload: cred
})


export const login = (data) => (dispatch) => {
    console.log("login credentials", data)
    fetch(`http://localhost:8080/api/users/login`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)      //username, password
    }).then(res => {
        console.log(res.json())
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    })
        .then(res => {
            console.log(res);
            dispatch(loginFinished(res));
        }).catch(err => console.log(err))
}