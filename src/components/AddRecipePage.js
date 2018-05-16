import React from 'react';
import { connect } from 'react-redux';
import { submitRecipe } from '../reducers/reducer';
import {removeState} from '../actions/action';
import {Redirect} from 'react-router-dom';
import DashBoard from './DashBoard';
import ImageUpload from './ImageUpload';
import './AddRecipePage.css'

class AddRecipePage extends React.Component {
    handleClick = (event) => {
        event.preventDefault();
        var userid = sessionStorage.getItem('id');
        const recipeName = this.recipeName.value.toLowerCase();
        const calories = this.calories.value;
        const id = this.props.id;
        const steps = this.stepBox.value;
        const ingredient = this.ingredientBox.value;
        this.props.dispatch(submitRecipe(recipeName, ingredient, calories, steps, id, userid));
    }
    handleKeyPress = (event) => {
        if(event.key === 'Enter' && this.ingredientInput.value !== ''){
          this.ingredientBox.value = this.ingredientBox.value +'-'+ this.ingredientInput.value + "\n";
          this.ingredientInput.value = '';
        }
        if(event.key === 'Enter' && this.stepInput.value !== '') {
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
        var token = localStorage.getItem('token');
        return (
            <div>
                <DashBoard />
                <form className="js-search-formm">
                    <div className="form-group">
                        <input type="text" name="recipeName" className="recipe-form" placeholder="Enter Recipe Name" ref={(input) => this.recipeName = input} />
                        <input className='ingredientInput recipe-form' placeholder ="input ingredient" onKeyPress={this.handleKeyPress} ref={(input) => this.ingredientInput = input}/>
                        <textarea className='ingredientBox recipe-form' ref={(input) => this.ingredientBox = input}></textarea>
                        <input type="text" name="calories" className="recipe-form" placeholder="Enter Calories" ref={(input) => this.calories = input} />
                        <input className='stepInput recipe-form' placeholder="input step" onKeyPress={this.handleKeyPress} ref={(input) => this.stepInput = input}/>
                        <textarea className='stepBox recipe-form' ref={(input) => this.stepBox = input}></textarea>
                        <ImageUpload />
                        <div className="btn-success recipe-form search" onClick ={e => this.handleClick(e)}>
                            Add Recipe
                        </div>
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
    token: state.token,
    fileType: state.fileType
})

export default connect(mapStateToProps)(AddRecipePage);