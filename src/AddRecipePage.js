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
    handleClick = (event) => {
        event.preventDefault();
        // const recipeName = this.recipeName.value;
        // const calories = this.calories.value;
        // const ingredient = this.props.ingredientsList;
        // const steps = this.props.stepsList;
        // const id = this.props.id
        // console.log('submitting');
        // this.props.dispatch(submitRecipe(recipeName, ingredient, calories, steps, id));
        const steps = this.stepBox.value;
        const ingredients = this.ingredientBox.value;
        console.log({"steps" : steps, "ingrediens": ingredients});

    }
    handleKeyPress = (event) => {
        //make it a condition for it to also equal the area selected
        if(event.key == 'Enter' && this.ingredientInput.value !== ''){
          console.log(this.ingredientInput.value)
          this.ingredientBox.value = this.ingredientBox.value +'-'+ this.ingredientInput.value + "\n";
          this.ingredientInput.value = '';
        }
        if(event.key == 'Enter' && this.stepInput.value !== '') {
            console.log('step input');
            this.stepBox.value = this.stepBox.value +'-'+ this.stepInput.value + "\n";
            this.stepInput.value = '';
        }
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
        console.log(this.props.added);
        var token = localStorage.getItem('token');
        console.log(token);
        return (
            <div>
                <DashBoard />
                <form className="js-search-formm col-md-12">
                    <div className="form-group">
                        <input type="text" name="recipeName" className="recipe-form col-md-6" placeholder="Enter Recipe Name" ref={(input) => this.recipeName = input} />
                        <input className='ingredientInput recipe-form col-md-6' onKeyPress={this.handleKeyPress} ref={(input) => this.ingredientInput = input}/>
                        <textarea className='ingredientBox recipe-form col-md-6' rows="12" ref={(input) => this.ingredientBox = input}></textarea>
                        {/* <AddIngredient /> */}
                        <input type="text" name="calories" className="recipe-form col-md-6" placeholder="Enter Calories" ref={(input) => this.calories = input} />
                        {/* <AddStep /> */}
                        <input className='stepInput recipe-form col-md-6' onKeyPress={this.handleKeyPress} ref={(input) => this.stepInput = input}/>
                        <textarea className='stepBox recipe-form col-md-6' rows="12" ref={(input) => this.stepBox = input}></textarea>
                        <ImageUpload />
                        <button type ="button" className="btn-success recipe-form search col-md-6" onClick ={e => this.handleClick(e)}>
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