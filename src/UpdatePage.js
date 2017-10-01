import React from 'react';
import { connect } from 'react-redux';
import {searchRecipe, updateRecipe} from './reducer';
import DashBoard from './DashBoard';

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
                return (
                    <div key={i}>
                    <section className='upper-container'>
                        <h2>this would hold the description and picture</h2>
                        <h3 className='cRed'>{recipe.dishName}</h3>
                    </section>
                    <section className='middle-container'>
                        <h2>ingredients</h2>
                        <h3 className='cRed'>{recipe.ingredients}</h3>
                    </section>
                    <section className='lower-container'>
                        <h2>steps</h2>
                    </section>
                    <div className ="btn btn-primary" onClick={(e) => this.handleUpdate(e, recipe)}>
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
    recipeData : state.recipeData
})

export default connect(mapStateToProps)(UpdatePage);