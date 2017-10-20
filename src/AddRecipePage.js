import React from 'react';
import { connect } from 'react-redux';
import { submitRecipe, removeState, uploadImage } from './reducer';
import {Redirect} from 'react-router-dom';
import DashBoard from './DashBoard';
import AddIngredient from './AddIngredient';
import AddStep from './AddStep';
import ImageUpload from './ImageUpload';
import './AddRecipePage.css'

//how do we grab data from steps,ingredients without it needing to be dispactched from the original component -- we can make it on change?
class AddRecipePage extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        const recipeName = this.recipeName.value;
        const calories = this.calories.value;
        const ingredient = this.props.ingredientsList;
        const steps = this.props.stepsList;
        const id = this.props.id
        console.log('submitting');
        this.props.dispatch(submitRecipe(recipeName, ingredient, calories, steps, id));
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
        // dishName, ingredients, calories, steps, image
        // a plus button next to ingredients to make a new input field
        console.log(this.props.added);
        var token = localStorage.getItem('token');
        console.log(token);
        return (
            <div>
                <DashBoard />
                <form className="js-search-formm col-md-12" onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" name="recipeName" className="recipe-form col-md-6" placeholder="Enter Recipe Name" ref={(input) => this.recipeName = input} />
                        <AddIngredient />
                        <input type="text" name="calories" className="recipe-form col-md-6" placeholder="Enter Calories" ref={(input) => this.calories = input} />
                        <AddStep />
                        <ImageUpload />
                        <button className="btn-success recipe-form search col-md-6">
                            Add Recipe
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    added: state.added,
    ingredientsList: state.ingredientsList,
    stepsList: state.stepsList,
    file: state.file,
    id : state.uuid,
    token: state.token
})

export default connect(mapStateToProps)(AddRecipePage);