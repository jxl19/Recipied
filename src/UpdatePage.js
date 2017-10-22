import React from 'react';
import { connect } from 'react-redux';
import { searchRecipe, updateRecipe, updateData, removeState } from './reducer';
import {Redirect} from 'react-router-dom';
import DashBoard from './DashBoard';
import { API_BASE_URL } from './config';
import ImageUpload from './ImageUpload';
import './UpdatePage.css';
//need to make on click focus on the element
//if we make it on click we can keep it as a form and just resend the data over as an update -- meaning we just load up the update page similar to the addnew page and we send whatevr inputs are in the field back over to the server
//we should probably change the data from the addrecipe page to reflect whatever is in the form... 

class UpdatePage extends React.Component {
    constructor() {
        super();
        this.state = {
            dishName: '',
            step: '',
            ingredient: '',
            calories: ''
        };
      }
    componentDidMount() {
        console.log(this.props.match.params.id)
        this.props.dispatch(searchRecipe(this.props.match.params.id))
    }
    //on blur send over to redux then from redux send back over to here then we can dispatch action to send everything over later
    handleChange(e) {
        e.preventDefault();
        console.log("area to change: " + e.target.id)
        if(e.target.id == "ingredient") {
            this.setState({ ingredient: e.target.value});
        }
        else if(e.target.id == "step") {
            this.setState({ step : e.target.value});
        }
        else if(e.target.id == "dishName") {
            this.setState({ ingredient: e.target.value});
        }
        else if(e.target.id =="calories") {
            this.setState({ calories: e.target.value});
        }
        console.log("value of target: " + e.target.value);
        console.log("value in state: " + this.state.ingredient);

    }
    handleUpdate(e, recipe) {
        e.preventDefault();
        console.log("ingredient:" + this.ingredient.value);
        console.log("step:" + this.step.value);
        console.log("calories: " + this.calories.value);
        console.log("dishName: " + this.dishName.value);
        console.log("uuid: " + uuid);
        console.log(recipe._id);
        let uuid = recipe.image;
        if(this.props.uuid) {
            uuid = this.props.uuid;
        }
        let ingredient = this.ingredient.value;
        let step = this.step.value;
        let calories = this.calories.value;
        let dishName = this.dishName.value;
        let recipeId = recipe._id
        this.props.dispatch(updateRecipe(ingredient, step, calories, dishName, recipeId, uuid))
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
        let recipes = undefined;
        if (this.props.recipeData) {
            recipes = this.props.recipeData.map((recipe, i) => {
                let ingredients = recipe.ingredients.map(ingredient => {
                    return <textarea className='col-xs-12' id="ingredient" key={i} defaultValue={ingredient} onChange={this.handleChange.bind(this)} ref={(input) => this.ingredient = input}></textarea>
                })
                let steps = recipe.steps.map(steps => {
                    return <textarea className='col-xs-12' id="step" key={i} defaultValue={steps} onChange={this.handleChange.bind(this)} ref={(input) => this.step = input} ></textarea>
                })
                let test = `${API_BASE_URL}/file/${recipe.image}`;
                let image = <img className='imagefile col-xs-6'src={test} />
                return (
                    <div className="col-xs-12" key={i}>
                        <div className='card col-xs-11'>
                            <section className='card-block'>
                                <h2 className='card-header head'>Recipe Update</h2>
                                <label className='col-xs-6'>Dishname
                                <input defaultValue={recipe.dishName} id="dishName" onChange={this.handleChange.bind(this)} ref={(input) => this.dishName = input}></input>
                                </label>
                                <label className='col-xs-6'>Calories
                                <input defaultValue={recipe.calories} id="calories" onChange={this.handleChange.bind(this)} ref={(input) => this.calories = input}></input>
                                </label>
                            </section>
                            <section className='card-block'>
                                <h1 className='card-header head'>Ingredients</h1>
                                <h3>{ingredients}</h3>
                            </section>
                            <section className='card-block'>
                                <h1 className='card-header head'>Steps</h1>
                                <h3>{steps}</h3>
                            </section>
                            <section className='card-block'>
                                <h1 className='card-header head text-center'>Image</h1>
                                <h3>{image}</h3>
                            </section>
                            <h1>Upload a new image if you wish to change image</h1>
                            <div className="test1">
                                <ImageUpload/>
                            </div>
                            <button className="btn-success recipe-forms" onClick={(e) => this.handleUpdate(e, recipe)}>
                                update recipe
                            </button>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div>
                <DashBoard />
                {recipes}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    recipeData: state.recipeData,
    uuid: state.uuid,
    added: state.added
})

export default connect(mapStateToProps)(UpdatePage);