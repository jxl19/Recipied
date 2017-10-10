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
    
    handleShareholderNameChange = (idx) => (evt) => {
      const newShareholders = this.state.ingredients.map((ingredients, sidx) => {
        if (idx !== sidx) return ingredients;
        return { ...ingredients, name: evt.target.value };
      });
      
      this.setState({ ingredients: newShareholders });
    }

    handleSubmit = (evt) => {
      const { name, ingredients } = this.state;
      alert(`Incorporated: ${name} with ${ingredients.length} ingredients`);
    }
    
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
                onChange={this.handleShareholderNameChange(idx)}
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