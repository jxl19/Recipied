import React from 'react';
import { connect } from 'react-redux';
import { getReciped } from './reducer';
import './recipePage.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
class RecipePage extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        const recipe = this.recipe.value;
        this.props.dispatch(getReciped(recipe));
    }
    render() {
        let recipes = undefined;
        if (this.props.existingRecipes) {
            recipes = this.props.existingRecipes.map((recipe) => {
                console.log("EXISTING RECIPE CHECK", this.props.existingRecipes);
                return (
                    <div className="card col-xs-5">
                        <div className="card-block">
                            <h4 className="card-title" key={recipe._id}>{recipe.dishName}</h4>
                            <p className="card-block">{recipe.ingredients}</p>
                            <a href="#" class="btn btn-primary">Go to recipe</a>
                        </div>
                        
                    </div>
                )
            }
            )
        }
        else {
            console.log('here')
            console.log(this.props.existingRecipes);
            recipes = <li>No Recipes here!</li>
        }
        return (
            //menu bar too thin
            //remove searchbox img -- play with colros
            <div>
                <nav className="dashboard-nav">
                    <h4 className="placeholder col-xs-2 text-center recipe-page" href="#">APPNAME</h4>
                    <h4 className="recipe-page col-xs-2 text-center">Search Recipes</h4>
                    <h4 className="recipe-page col-xs-2 text-center">
                        placeholder
                </h4>
                    <h4 className="recipe-page col-xs-2 text-center">
                        placeholder
                </h4>
                    <h4 className="recipe-page col-xs-2 text-center">
                        placeholder
                </h4>
                <h4 className="recipe-page col-xs-2 text-center" id="signout">
                        sign-out
                </h4>
                </nav>
                    <div className="jumbotron jumbotron-fluid">
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
})

export default connect(mapStateToProps)(RecipePage);