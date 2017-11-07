import React from 'react';
import { connect } from 'react-redux';
import { submitRecipe, uploadImage } from '../reducers/reducer';
import {removeState} from '../actions/action';
import {Redirect} from 'react-router-dom';
import DashBoard from './DashBoard';
import ImageUpload from './ImageUpload';
import './AddRecipePage.css'

class AddRecipePage extends React.Component {
    handleClick = (event) => {
        event.preventDefault();
        var userid = sessionStorage.getItem('id');
        const recipeName = this.recipeName.value;
        const calories = this.calories.value;
        const uuid = this.props.id
        const steps = this.stepBox.value;
        const ingredient = this.ingredientBox.value;
        this.props.dispatch(submitRecipe(recipeName, ingredient, calories, steps, uuid, userid));
    }
    handleKeyPress = (event) => {
        if(event.key == 'Enter' && this.ingredientInput.value !== ''){
          console.log(this.ingredientInput.value)
          this.ingredientBox.value = this.ingredientBox.value +'-'+ this.ingredientInput.value + "\n";
          this.ingredientInput.value = '';
        }
        if(event.key == 'Enter' && this.stepInput.value !== '') {
            this.stepBox.value = this.stepBox.value +'-'+ this.stepInput.value + "\n";
            this.stepInput.value = '';
        }
      }
    render() {
        if (this.props.added) {
            this.props.dispatch(removeState());
            var result = window.confirm("success");
            if(result === true) {
            return (
                <Redirect to={"/home"} /> 
            )}
        }
        // dishName, ingredients, calories, steps, image
        var token = localStorage.getItem('token');
        return (
            <div>
                <DashBoard />
                <form className="js-search-formm col-md-12">
                    <div className="form-group">
                        <input type="text" name="recipeName" className="recipe-form col-md-6" placeholder="Enter Recipe Name" ref={(input) => this.recipeName = input} />
                        <input className='ingredientInput recipe-form col-md-6' placeholder ="input ingredient" onKeyPress={this.handleKeyPress} ref={(input) => this.ingredientInput = input}/>
                        <textarea className='ingredientBox recipe-form col-md-6' ref={(input) => this.ingredientBox = input}></textarea>
                        <input type="text" name="calories" className="recipe-form col-md-6" placeholder="Enter Calories" ref={(input) => this.calories = input} />
                        <input className='stepInput recipe-form col-md-6' placeholder="input step" onKeyPress={this.handleKeyPress} ref={(input) => this.stepInput = input}/>
                        <textarea className='stepBox recipe-form col-md-6' ref={(input) => this.stepBox = input}></textarea>
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