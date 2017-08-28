import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

ReactDOM.render(
    // <Router>
        <Provider store={store}>
            <App />
        </Provider>
    //  </Router>
    ,
    document.getElementById('root')
);