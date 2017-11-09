import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipePage from './recipePage';
import HomePage from './HomePage';
import LoginPage from '../login/LoginPage';
import SignUpPage from '../login/SignUpPage';
import SearchRecipePage from './SearchRecipePage';
import AddRecipePage from './AddRecipePage';
import MyRecipePage from './MyRecipePage';
import UpdatePage from './UpdatePage';
import ImageUpload from './ImageUpload';
import RoutePrivate from './RoutePrivate';
import createHistory from 'history/createBrowserHistory'


const history = createHistory()
class App extends React.Component {

    render() {
        return (
            <div className="app">
                <Router history={history}>
                    <Switch>
                        <RoutePrivate path="/homepage" component={HomePage}/>
                        <RoutePrivate exact path="/myrecipes" component={MyRecipePage} />
                        <RoutePrivate exact path ="/addrecipes" component ={AddRecipePage}/>
                        <RoutePrivate exact path="/home" component={RecipePage}/>
                        <RoutePrivate exact path="/recipepage/:id" component={SearchRecipePage}/>
                        <RoutePrivate exact path="/myrecipes/:id" component={UpdatePage}/>
                        <RoutePrivate exact path ="/imageupload" component={ImageUpload}/>
                        <Route exact path="/" component={LoginPage} />
                        <Route exact path="/signup" component={SignUpPage} />
                    </Switch>
                </Router>
            </div>

        );
    }
}

export default connect()(App);