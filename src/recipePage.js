import React from 'react';
import { connect } from 'react-redux';
import { getReciped } from './reducer';

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

                console.log("EXISTING RECIPE CHECK", this.props.existingRecipes, this.props.name);
                return (
                    <li className="black-box recipe-item" key={recipe._id}>
                        <div className="recipe">
                            <h2>{recipe.dishName}</h2>
                            <h3>{recipe.ingredients}</h3>
                        </div>
                    </li>
                )
            }
            )
        }
        else {
            recipes = <li className="black-box">No Recipes here!</li>
        }
        return (

            <div>
                <form onSubmit={e => this.onSubmit(e)}>
                    <h2>Get Recipe</h2>
                    <div className="form-group">
                        <label className="control-label">Recipe Name</label>
                        <input
                            type="text"
                            name="getRecipe"
                            className="form-control"
                            ref={(input) => this.recipe = input}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn-btn-primary btn-lg"
                        >Submit
                    </button>
                    </div>
                </form>
                <ul className="recipee">
                    {recipes}
                </ul>
            </div>
        )
    }
}

RecipePage.defaultProps = {
    title: 'salad'
};

const mapStateToProps = (state) => ({
    existingRecipes: state.recipes,
})

export default connect(mapStateToProps)(RecipePage);