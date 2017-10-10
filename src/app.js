import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RecipePage from './recipePage';
import HomePage from './HomePage';
import LoginPage from './login/LoginPage';
import SearchRecipePage from './SearchRecipePage';
import AddRecipePage from './AddRecipePage';
import MyRecipePage from './MyRecipePage';
import UpdatePage from './UpdatePage';
import ImageUpload from './ImageUpload';
import { createBrowserHistory } from 'history';

class App extends React.Component {

    render() {
        let loggedIn = this.props.isLoggedIn;
        // console.log(loggedIn);
        return (
            <div className="app">
                <Router history={createBrowserHistory}>
                    <Switch>
                        {/* <Route path ="/getrecipe" component={GetRecipe} /> */}
                        <Route path="/homepage" component={HomePage} />
                        <Route exact path="/myrecipes" component={MyRecipePage} />
                        <Route exact path ="/addrecipes" component ={AddRecipePage} />
                        <Route exact path="/home" component={RecipePage} />
                        {/* :recipe is going to be the id key */}
                        <Route exact path="/recipepage/:id" component={SearchRecipePage} />
                        <Route exact path="/myrecipes/:id" component={UpdatePage} />
                        <Route exact path ="/imageupload" component={ImageUpload} />
                        <Route exact path="/" render={() => (
                            loggedIn ? (<Redirect to="/home" />) : (<LoginPage />)
                        )} />
                    </Switch>
                </Router>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.isLoggedIn
})

export default connect(mapStateToProps)(App);