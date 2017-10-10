import React from 'react';
import { connect } from 'react-redux';
import {searchRecipe} from './reducer';
import DashBoard from './DashBoard';

//only 4 on search, with next button
//maybe a background for the card itself?
class SearchRecipePage extends React.Component {
    //create reduicer to set the idset state to false
    componentWillMount(props) {
        console.log(this.props.match.params.id);
        this.props.dispatch(searchRecipe(this.props.match.params.id));
    }
    render() {
        console.log(this.props.recipeData);
        let recipes = undefined;
        if (this.props.recipeData) {
            recipes = this.props.recipeData.map((recipe, i) => {
                return (
                    <div key={i}>
                    <section className='upper-container'>
                        <h2>this would hold the description and picture</h2>
                        <h3 className='cRed'>{recipe.dishName}</h3>
                        <h1>{recipe.calories}</h1>
                    </section>
                    <section className='middle-container'>
                        <h2>ingredients</h2>
                        <h3 className='cRed'>{recipe.ingredients}</h3>
                    </section>
                    <section className='lower-container'>
                        <h2>{recipe.steps}</h2>
                    </section>
                </div>
                )
            })
        }
        else {
            recipes = <h1> nothing here</h1>
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
    recipeData: state.recipeData
})


export default connect(mapStateToProps)(SearchRecipePage);