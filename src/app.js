import React from 'react';
// import {Switch,Route} from 'react-router-dom'
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import GetRecipe from './getRecipe';
import RecipeCreatePage from './recipecreate-page';
import RecipePage from './recipePage';
import LogIn from './login/login';
export class App extends React.Component {

    render() {
        return (

            <div className="app">
                {/* < RecipeCreatePage /> */}
                {/* <Route path ="/getrecipe" component ={GetRecipe} /> */}
                {/* <p className="recipePage">
                    <Link to="recipepage">Recipes</Link>
                </p> */}
                {/* <Route path="/recipepage" component={RecipePage} /> */}
                <RecipePage />
                {/* <Route exact path="/login" component={LogIn} /> */}
            </div>

        );
    }
}


export default connect()(App);