import React from 'react';
import { connect } from 'react-redux';
import {searchRecipe} from './reducer';
import DashBoard from './DashBoard';

//only 4 on search, with next button

class SearchRecipePage extends React.Component {
    //create reduicer to set the idset state to false
    componentWillMount(props) {
        console.log(this.props.match.params.id);
        this.props.dispatch(searchRecipe(this.props.match.params.id));
    }
    render() {
        console.log(this.props.recipeData);
        if(this.props.recipeData) {
            console.log(this.props.recipeData[0].ingredients);
                return (
                    <div>
                        <DashBoard />
                    <section className='upper-container'>
                        <h2>this would hold the description and picture</h2>
                        <h3 className='cRed'>{this.props.recipeData[0].dishName}</h3>
                    </section>
                    <section className='middle-container'>
                        <h2>ingredients</h2>
                        <h3 className='cRed'>{this.props.recipeData[0].ingredients}</h3>
                    </section>
                    <section className='lower-container'>
                        <h2>steps</h2>
                    </section>
                </div>
                )}
        return (
            <div>
                <DashBoard />
                <h1>nothing here </h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    recipeData: state.recipeData
})


export default connect(mapStateToProps)(SearchRecipePage);