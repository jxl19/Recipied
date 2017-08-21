import React from 'react';
// import {Switch,Route} from 'react-router-dom'
import { connect } from "react-redux";
import { Link, Route } from 'react-router-dom';
import GetRecipe from './getRecipe';
import RecipeCreatePage from './recipecreate-page';
import RecipePage from './recipePage';
export class App extends React.Component {

    render() {
        return (
            <div className="app">
                <RecipeCreatePage />
                {/* <GetRecipe /> */}
                {/* <p className="recipePage">
                    <Link to="recipepage">Recipes</Link>
                </p>
                <Route path="/recipepage" component={RecipePage} /> */}
                <RecipePage />
            </div>
        );
    }
}


export default connect()(App);