import React from 'react';
// import {Switch,Route} from 'react-router-dom';
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import GetRecipe from './getRecipe';
import RecipeCreatePage from './recipecreate-page';
import RecipePage from './recipePage';
import LogIn from './login/login';
import HomePage from './HomePage';
export class App extends React.Component {

    render() {
        return (

            <div className="app">
                {/* <Switch> */}
                {/* < RecipeCreatePage /> */}
                {/*getrecipe ep no need*/}
                {/* <Route path ="/getrecipe" component={GetRecipe} /> */}
                {/* <p className="recipePage">
                    <Link to="recipepage">Recipes</Link>  
                </p> */}
                <Route path ="/homepage" component={HomePage} />
                {/* <Route path ="/login" component ={LogIn} /> */}
                <Route path="/recipepage" component={RecipePage} />
                {/* <RecipePage /> */}
                <Route exact path="/login" component={LogIn} />
                {/* </Switch> */}
            </div>

        );
    }
}


export default connect()(App);