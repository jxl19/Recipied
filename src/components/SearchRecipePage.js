import React from 'react';
import { connect } from 'react-redux';
import { searchRecipe, createBitlyLink } from '../reducers/reducer';
import DashBoard from './DashBoard';
import { API_BASE_URL } from '../config';
import './SearchRecipePage.css'

class SearchRecipePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            copied : 'invisible'
        }
    }
    componentWillMount(props) {
        this.props.dispatch(searchRecipe(this.props.match.params.id));
    }
    handleClick(e) {
        e.preventDefault();
        this.props.dispatch(createBitlyLink(window.location.href));
    }
    handleCopy = (e, link) => {
        function handler(event) {
            event.clipboardData.setData('text/plain', link);
            event.preventDefault();
            document.removeEventListener('copy', handler, true);
        }
        document.addEventListener('copy', handler, true);
        document.execCommand('copy');
        this.setState({copied: 'visible'});
    }
    render() {
        let newStr;
        function removeArr(str) {
            for (var i = 0; i < str.length; i++) {
                newStr = str[i];
            }
            newStr = newStr.split('-');
        }
        function splitString(str) {
            removeArr(str);
            var arr = [];
            let split;
            for (var i = 0; i < newStr.length; i++) {
                split = newStr[i].replace('↵', '');
                if (newStr[i] !== '') {
                    arr.push(newStr[i].split(/\n|\r|↵/).join(''));
                }
            }
            return arr;
        }
        var linkCopied = <div className={this.state.copied}>Link copied to clipboard!</div>
        let recipes = undefined;
        if (this.props.linkCreated) {
            var bLink = <div onClick={e => this.handleCopy(e, this.props.link)}><h3 className="bLink">{this.props.link}</h3></div>
        }
        if (this.props.recipeData) {
            recipes = this.props.recipeData.map((recipe, i) => {
                let imglocation = `https://s3-us-west-1.amazonaws.com/recipied/uploads/${recipe.image}`;
                let image = <img className='imagefile' src={imglocation} />
                var ingredientsSplit = splitString(this.props.recipeData[0].ingredients);
                let stepsSplit = splitString(this.props.recipeData[0].steps);
                let ingredients = ingredientsSplit.map(ingredient => {
                    return <li className='ing' key={ingredient}>{ingredient}</li>
                })
                let steps = stepsSplit.map(step => {
                    return <li className='steps' key={step}>{step}</li>
                })
                return (
                    <div className='recipe-container' key={i}>
                        <section className='upper-container'>
                            <h3 className='dishname'>{recipe.dishName}</h3>
                            <div className='image'>{image}</div>
                            <div className='calories'>
                                <h3>Calories: {recipe.calories}</h3>
                            </div>
                        </section>
                        <section className='middle-container'>
                            <h3>Ingredients</h3>
                            <ol className='ingredient-list'>{ingredients}</ol>
                        </section>
                        <div className='lower-container'>
                            <h3>Steps</h3>
                            <ol className='step-list'>{steps}</ol>
                        </div>
                        <div className="create-bitly" onClick={e => this.handleClick(e)}>
                            <h3>
                                Create bitly link
                                </h3>
                        </div>
                        {bLink}
                        {linkCopied}
                    </div>
                )
            })
        }
        else {
            recipes = <h1>No Recipe</h1>
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