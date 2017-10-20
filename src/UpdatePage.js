import React from 'react';
import { connect } from 'react-redux';
import {searchRecipe, updateRecipe} from './reducer';
import DashBoard from './DashBoard';
import './UpdatePage.css';
//need to make on click focus on the element
//if we make it on click we can keep it as a form and just resend the data over as an update -- meaning we just load up the update page similar to the addnew page and we send whatevr inputs are in the field back over to the server
//we should probably change the data from the addrecipe page to reflect whatever is in the form... 

class UpdatePage extends React.Component {
    componentDidMount() {
        console.log(this.props.match.params.id)
        this.props.dispatch(searchRecipe(this.props.match.params.id))
    }
    handleUpdate(e, recipe) {
        //make reducer to handle the updates
        e.preventDefault();
    }

    render() {
        let recipes = undefined;
        if (this.props.recipeData) {
            recipes = this.props.recipeData.map((recipe, i) => {
                let ingredients = recipe.ingredients.map(ingredient => {
                    return <div className='col-xs-12'>{ingredient}</div>
                })
                return (
                    <div className = 'card col-xs-11' key={i}>
                    <section className='card-block'>
                        <h2 className='card-header head'>this would hold the description and picture</h2>
                        <h3>{recipe.dishName}</h3>
                        <h3> {recipe.calories}</h3>
                    </section>
                    <section className='card-block'>
                        <h1 className='card-header head'>ingredients</h1>
                        <h3>{ingredients}</h3>
                    </section>
                    <section className='card-block'>
                        <h2 className='card-header head'>{recipe.steps}</h2>
                    </section>
                    <button className ="btn-success recipe-form search col-md-6" onClick={(e) => this.handleUpdate(e, recipe)}>
                        update recipe
                    </button>
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
    recipeData : state.recipeData
})

export default connect(mapStateToProps)(UpdatePage);