import React from 'react';
import { connect } from 'react-redux';
import { submitRecipe } from './reducer';
class RecipeCreateForm extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        const recipe = this.recipe.value;
        const ingredients = this.ingredients.value;
        this.props.dispatch(submitRecipe(recipe, ingredients));
    }

    render() {
        return (
            <form onSubmit={e => this.onSubmit(e)}>
                <h2>Submit Recipe</h2>
                <div className="form-group">
                    <label className="control-label">Recipe Name</label>
                    <input
                        type="text"
                        name="recipeName"
                        className="form-control"
                        ref={(input) => this.recipe = input}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label">Ingredients</label>
                    <input
                        type="text"
                        name="ingredients"
                        className="form-control"
                        ref={(input) => this.ingredients = input}
                    />
                </div>
                <div className="form-group">
                    <button className="btn-btn-primary btn-lg">
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

export default connect()(RecipeCreateForm);