import React from 'react';
import { connect } from 'react-redux';
import { getReciped, getId } from './reducer';
import './recipePage.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './DashBoard';
import {Redirect} from 'react-router-dom';
//make the other pages, delete and update requests on the client side
class RecipePage extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        const recipe = this.recipe.value;
        this.props.dispatch(getReciped(recipe));
    }
    handleClick(e, recipe) {
        e.preventDefault();
        console.log(recipe._id);
        this.props.dispatch(getId(recipe._id));
    }
    render() {
        if(this.props.idSet) {
            console.log(this.props.idSet);
            return  <Redirect to={"/recipepage/" + this.props.id } /> 
        }
        console.log(this.props.isLoggedIn);
        let recipes = undefined;
        if (this.props.existingRecipes) {
            recipes = this.props.existingRecipes.map((recipe, i) => {
                console.log("EXISTING RECIPE CHECK", this.props.existingRecipes);
                return (
                    <div className="card col-xs-5" key={i}>
                        <div className="card-block">
                            <h4 className="card-title">{recipe.dishName}</h4>
                            <p className="card-block">{recipe.ingredients}</p>
                            <div className ="btn btn-primary" onClick={(e) => this.handleClick(e, recipe)}>
                                Go to recipe
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else {
            console.log('here')
            console.log(this.props.existingRecipes);
            recipes = <li>No Recipes here!</li>
        }
        return (
            <div>
                <DashBoard />
                    <div className="jumbotron jumbotron-fluid jumbotron-bg">
                        <div className="container">
                <form className="js-search-form col-md-12" onSubmit={e => this.onSubmit(e)}>
                            <div className="form-group">
                                <input type="text" name="getRecipe" className="recipe-form col-md-6" placeholder="search for recipe" ref={(input) => this.recipe = input} />
                                <div className="search col-md-1">
                                    <i className="glyphicon glyphicon-search"></i>
                                </div>
                            </div>
                </form>
                        </div>
                    </div>

                <ul className="recipee col-xs-12">
                    {recipes}
                </ul>
            </div>
        )
    }
}

// RecipePage.defaultProps = {
//     title: 'salad'
// };

const mapStateToProps = (state) => ({
    existingRecipes: state.recipes,
    isLoggedIn: state.isLoggedIn,
    id: state.id,
    idSet: state.idSet
})

export default connect(mapStateToProps)(RecipePage);