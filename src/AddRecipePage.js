import React from 'react';
import { connect } from 'react-redux';
import { submitRecipe, removeState } from './reducer';
import {Redirect} from 'react-router-dom';
import DashBoard from './DashBoard';


//add the new props into the fields

class AddRecipePage extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        const recipeName = this.recipeName.value;
        const ingredient = this.ingredient.value;
        this.props.dispatch(submitRecipe(recipeName, ingredient));
    }
    render() {
        if (this.props.added) {
            this.props.dispatch(removeState());
            console.log(this.props.added);
            var result = window.confirm("success");
            if(result === true) {
            return (
                <Redirect to={"/home"} /> 
            )}
        }
        console.log(this.props.added);
        return (
            <div>
                <DashBoard />
                <form className="js-search-form col-md-12" onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" name="recipeName" className="recipe-form col-md-6" placeholder="recipe name" ref={(input) => this.recipeName = input} />
                        <input type="text" name="ingredient" className="recipe-form col-md-6" placeholder="ingredient" ref={(input) => this.ingredient = input} />
                        <div className="search col-md-1">
                            <button>Add Recipe</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    added: state.added
})

export default connect(mapStateToProps)(AddRecipePage);