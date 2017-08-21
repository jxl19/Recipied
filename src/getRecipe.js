import React from 'react';
import { connect } from 'react-redux';
import { getReciped } from './reducer';
import store from './store';
//maybe render new route on submit to put out the information.
class GetRecipe extends React.Component {
    componentWillMount() {
        store.dispatch(getReciped());
    }
    onSubmit(e) {
        e.preventDefault();
        const recipe = this.recipe.value;
        this.props.dispatch(getReciped(recipe));
    }
    render() {
        return (
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
                    <button className="btn-btn-primary btn-lg">
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

// const mapStateToProps = (state) => ({
//     existingRecipes: state.recipeReducer.recipeName
// })

export default connect()(GetRecipe);