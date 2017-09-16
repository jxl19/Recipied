import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import RecipePage from './recipePage';
import HomePage from './HomePage';
import LoginPage from './login/LoginPage';
import { createBrowserHistory } from 'history';

class App extends React.Component {

    render() {
        let loggedIn = this.props.isLoggedIn;
        console.log(loggedIn);
        return (
            <div className="app">
                <Router history={createBrowserHistory}>
                    <Switch>
                        {/* <Route path ="/getrecipe" component={GetRecipe} /> */}
                        <Route path="/homepage" component={HomePage} />
                        <Route path="/recipepage" component={RecipePage} />

                        <Route exact path="/" render={() => (
                            loggedIn ? (<Redirect to="/homepage" />) : (<LoginPage />)
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