import React from 'react';
import { connect } from 'react-redux';
import { getReciped } from './reducer';

class RecipePage extends React.Component {
    constructor(props) {
        super(props);

        this.props.dispatch(getReciped(this.props.title));
    }
    render() {
        let recipes = undefined;
        if (this.props.existingRecipes) {
            recipes = this.props.existingRecipes.map((recipe) => {

                console.log("EXISTING RECIPE CHECK", this.props.existingRecipes);
                return (
                    <li className="black-box recipe-item" key={recipe._id}>
                        <div className="recipe">
                            <h2>{this.props.title}</h2>
                            <h3>{recipe.ingredients}</h3>
                        </div>
                    </li>
                )
            }
            )
        }
        else {
            recipes = <li className="black-box">No Recipes here!</li>
        }
        return (
            <div>
                <ul className="recipee">
                    {recipes}
                </ul>
            </div>
        )
    }
}

RecipePage.defaultProps = {
    title: 'salad'
};

const mapStateToProps = (state) => ({
    existingRecipes: state.recipes
})

export default connect(mapStateToProps)(RecipePage);