import React from 'react';
import { connect } from 'react-redux';
import {addRList} from './reducer';
import './AddIngredient.css';
//on each 'add' make sure to add to state which is an array?
class AddIngredient extends React.Component {
    constructor() {
      super();
      this.state = {
        name: '',
        ingredients: [{ name: '' }],
        test: [],
      };
    }
    
    handleNameChange = (idx) => (evt) => {
      const newName = this.state.ingredients.map((ingredients, sidx) => {
        if (idx !== sidx) return ingredients;
        return { ...ingredients, name: evt.target.value };
      });
      
      this.setState({ ingredients: newName });
    }

    handleSubmit = (evt) => {
      const { name, ingredients } = this.state;
      alert(`Incorporated: ${name} with ${ingredients.length} ingredients`);
    }
    //can we put handleadd with onchange together
    //or a text box?
    //or a text box that handles multiple inputs -- this seems to be the option
    //lets use a text box https://stackoverflow.com/questions/6262472/multiple-lines-of-input-in-input-type-text
    //https://stackoverflow.com/questions/6262472/multiple-lines-of-input-in-input-type-text
    handleAddIngredient = () => {
      console.log(this.ingredients.value);
      this.setState({ ingredients: this.state.ingredients.concat([{ name: '' }]) });
      this.props.dispatch(addRList(this.ingredients.value))
    }
    
    handleRemoveIngredient = (idx) => () => {
      this.setState({ ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx) });
    }
    
    render() {    
      return (
        <div className="ingredient">
          {this.state.ingredients.map((ingredients, idx) => (
            <div key={idx}>
              <input
                type="text"
                name ="ingredient"
                className="recipe-form col-md-6"
                placeholder={`Ingredient #${idx + 1}`}
                onChange={this.handleNameChange(idx)}
                ref={(input) => this.ingredients = input}/>
          <button type="button" onClick={this.handleAddIngredient} className="small pull-left">+</button>
              <button type="button" onClick={this.handleRemoveIngredient(idx)} className="small pull-left">-</button>
            </div>
          ))}
        </div>
      )
    }
  }

  export default connect()(AddIngredient);