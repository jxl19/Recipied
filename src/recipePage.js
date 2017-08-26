import React from 'react';
import { connect } from 'react-redux';
import {getReciped} from './reducer';

class RecipePage extends React.Component {
    constructor(props) {
        super(props);

        this.props.dispatch(getReciped(this.props.title));
    }
    render() {
        console.log("EXISTING RECIPE CHECK", this.props.existingRecipes);
        return (
            <div className="recipe">
                <h2>{this.props.title}</h2>
                <h3>{this.props.ingredients}</h3>
                <h4>{this.props.existingRecipes}</h4>
            </div>
        )
    }
}

RecipePage.defaultProps = {
    title: 'salad'
};

const mapStateToProps = (state) => ({
    existingRecipes: state.recipeName, 
    ingredients: state.ingredient
})

export default connect(mapStateToProps)(RecipePage);