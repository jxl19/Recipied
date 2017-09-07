import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import GetRecipe from './getRecipe';
import RecipeCreatePage from './recipecreate-page';
import RecipePage from './recipePage';
import LogIn from './login/login';
import HomePage from './HomePage';
import { createBrowserHistory } from 'history';

class App extends React.Component {

    render() {
        let loggedIn = this.props.isLoggedIn;
        console.log(loggedIn);
        return (
            <div className="app">
                <Router history={createBrowserHistory}>
                    <Switch>
                        {/* < RecipeCreatePage /> */}
                        {/*getrecipe ep no need*/}
                        {/* <Route path ="/getrecipe" component={GetRecipe} /> */}
                        {/* <p className="recipePage">
                    <Link to="recipepage">Recipes</Link>  
                </p> */}
                        <Route path="/homepage" component={HomePage} />
                        <Route path="/recipepage" component={RecipePage} />

                        <Route exact path="/login" render={() => (
                        loggedIn ? (
                            <Redirect to="/homepage" />
                        ) : (
                                <LogIn />
                            )
                    )} />
                        {/* <Route path="/login" component={LogIn} /> */}
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