import React from 'react';
import { connect } from 'react-redux';
import { loadRecipe } from './reducer';
import { push } from 'react-router-redux';
import store, { history } from './store';
//maybe render new route on submit to put out the information.
class GetRecipe extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        const recipe = this.recipe.value;
        this.props.dispatch(loadRecipe(recipe));
        console.log('test')
        this.props.dispatch(push('/recipepage'));
        console.log(recipe);
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
                    <button className="btn-btn-primary btn-lg"
                    >Submit
                    </button>
                </div>
            </form>
        )
    }
}

export default connect()(GetRecipe);