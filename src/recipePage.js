import React from 'react';
import { connect } from 'react-redux';

class RecipePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log("recipe", this.props.existingRecipes);
        return (
            <div className="recipe">
                <h2>{this.props.title}</h2>
            </div>
        )
    }
}

RecipePage.defaultProps = {
    title: 'cheese'
};

const mapStateToProps = (state) => ({
    existingRecipes: state.recipeName
});

export default connect(mapStateToProps)(RecipePage);