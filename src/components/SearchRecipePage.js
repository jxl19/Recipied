import React from 'react';
import { connect } from 'react-redux';
import { searchRecipe, createBitlyLink } from '../reducers/reducer';
import DashBoard from './DashBoard';
import { API_BASE_URL } from '../config';
import './SearchRecipePage.css'

class SearchRecipePage extends React.Component {
    componentWillMount(props) {
        this.props.dispatch(searchRecipe(this.props.match.params.id));
    }
    handleClick(e) {
        e.preventDefault();
        this.props.dispatch(createBitlyLink(window.location.href))
    }
    handleCopy = (e) => {
        function handler (event){
            event.clipboardData.setData('text/plain', window.location.href);
            event.preventDefault();
            document.removeEventListener('copy', handler, true);
        }
    
        document.addEventListener('copy', handler, true);
        document.execCommand('copy');
    }
    render() {
        
        let recipes = undefined;
        if(this.props.linkCreated) {
            var bLink = <div onClick={this.handleCopy}><h3 className="bLink text-center">{this.props.link}</h3></div>
        }
        if (this.props.recipeData) {
            recipes = this.props.recipeData.map((recipe, i) => {
                let imglocation = `${API_BASE_URL}/file/${recipe.image}`;
                let image = <img className='imagefile col-xs-6' src={imglocation} />
                let ingredients = recipe.ingredients.map(ingredient => {
                    return <div className='col-xs-6'>{ingredient}</div>
                })
                let steps = recipe.steps.map(step => {
                    return <div className='col-xs-12'>{step}</div>
                })
                return (
                    <div className='col-xs-12' key={i}>
                        <section className='upper-container col-xs-12'>
                            <h3 className='col-xs-6'>{recipe.dishName}</h3>
                            {image}
                            <div className='col-xs-12'>
                                <h3>Calories: {recipe.calories}</h3>
                            </div>
                        </section>
                        <section className='middle-container col-xs-12'>
                            <h3>Ingredients</h3>
                            <div className='col-xs-12 ingredient-list'>{ingredients}</div>
                        </section>
                        <div className='lower-container col-xs-12'>
                            <h3>Steps</h3>
                            <div className='col-xs-12 step-list'>{steps}</div>
                        </div>
                        <div onClick={e => this.handleClick(e)}>
                            <h3 className="create-bitly text-center">
                                Create bitly link
                                </h3>
                        </div>
                                {bLink}
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
    recipeData: state.recipeData,
    link: state.link,
    linkCreated: state.linkCreated
})


export default connect(mapStateToProps)(SearchRecipePage);