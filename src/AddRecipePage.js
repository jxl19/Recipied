import React from 'react';
import { connect } from 'react-redux';
import { submitRecipe, removeState } from './reducer';
import {Redirect} from 'react-router-dom';
import DashBoard from './DashBoard';
import AddIngredient from './AddIngredient';
import AddStep from './AddStep';
import './AddRecipePage.css'

// add the new props into the fields
// dishName, ingredients, calories, steps, image
// each '+' is now pushed into the state, all we do now is dispatch it when with the post req when we submit form - mapstatetoprops or reducer side
class AddRecipePage extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        const recipeName = this.recipeName.value;
        const ingredient = this.refs.ingredient;
        const calories = this.calories.value;
        // const steps = this.steps.value;
        console.log(ingredient);
        console.log(calories);
        // this.props.dispatch(submitRecipe(recipeName, ingredient, calories, steps));
        // this.props.dispatch(testSubmit(data));
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
        return (
            <div>
                <DashBoard />
                <form className="js-search-formm col-md-12" onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" name="recipeName" className="recipe-form col-md-6" placeholder="Enter Recipe Name" ref={(input) => this.recipeName = input} />
                        {/* <input type="text" name="ingredient" className="recipe-form col-md-6" placeholder="Enter Ingredient" ref={(input) => this.ingredient = input} />  */}
                        <AddIngredient />
                        <input type="text" name="calories" className="recipe-form col-md-6" placeholder="Enter Calories" ref={(input) => this.calories = input} />
                        {/* <input type="text" name="steps" className="recipe-form col-md-6" placeholder="Enter Steps" ref={(input) => this.steps = input} /> */}
                        {/* <AddStep /> */}
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
    added: state.added
})

export default connect(mapStateToProps)(AddRecipePage);