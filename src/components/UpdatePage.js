import React from 'react';
import { connect } from 'react-redux';
import { searchRecipe, updateRecipe } from '../reducers/reducer';
import {removeState} from '../actions/action';
import {Redirect} from 'react-router-dom';
import DashBoard from './DashBoard';
import ImageUpload from './ImageUpload';
import './UpdatePage.css';

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
        this.props.dispatch(searchRecipe(this.props.match.params.id))
    }
    handleChange(e) {
        e.preventDefault();
        if(e.target.id === "ingredient") {
            this.setState({ ingredient: e.target.value});
        }
        else if(e.target.id === "step") {
            this.setState({ step : e.target.value});
        }
        else if(e.target.id === "dishName") {
            this.setState({ ingredient: e.target.value});
        }
        else if(e.target.id ==="calories") {
            this.setState({ calories: e.target.value});
        }
    }
    handleUpdate(e, recipe) {
        e.preventDefault();
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
                    return <textarea className='update-ingredient' id="ingredient" key={i} defaultValue={ingredient} onChange={this.handleChange.bind(this)} ref={(input) => this.ingredient = input}></textarea>
                })
                let steps = recipe.steps.map(steps => {
                    return <textarea className='update-step' id="step" key={i} defaultValue={steps} onChange={this.handleChange.bind(this)} ref={(input) => this.step = input} ></textarea>
                })
                let photo = `https://s3-us-west-1.amazonaws.com/recipied/uploads/${recipe.image}`;
                let alt_image = `${recipe.dishName}`
                let image = <img className='imagefile'src={photo} alt={alt_image}/>
                return (
                        <div className='card' key={i}>
                            <section className='card-block'>
                                <h1 className='card-header head'>Recipe Update</h1>
                                <label className='dishupdate'>Dishname
                                <input defaultValue={recipe.dishName} id="dishName" onChange={this.handleChange.bind(this)} ref={(input) => this.dishName = input}></input>
                                </label>
                                <label className='calupdate'>Calories
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
                            <div className="image-change">
                                <ImageUpload/>
                            </div>
                            <div className="btn-success update-button" onClick={(e) => this.handleUpdate(e, recipe)}>
                                update recipe
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