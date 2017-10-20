import React from 'react';
import { connect } from 'react-redux';
import {addStepList} from './reducer';
import './AddIngredient.css';
class AddStep extends React.Component {
    constructor() {
      super();
      this.state = {
        name: '',
        steps: [{ name: '' }],
      };
    }

    handleNameChange = (idx) => (evt) => {
      const newName = this.state.steps.map((steps, sidx) => {
        if (idx !== sidx) return steps;
        return { ...steps, name: evt.target.value };
      });
      
      this.setState({ steps: newName });
    }
    
    handleSubmit = (evt) => {
      const { name, steps } = this.state;
      alert(`Incorporated: ${name} with ${steps.length} steps`);
    }
    
    handleAddSteps = () => {
      console.log(this.steps.value);
      this.setState({ steps: this.state.steps.concat([{ name: '' }]) });
      this.props.dispatch(addStepList(this.steps.value))
    }
    
    handleRemoveSteps = (idx) => () => {
      this.setState({ steps: this.state.steps.filter((s, sidx) => idx !== sidx) });
    }
    
    render() {    
      return (
        <div className="steps">
          {this.state.steps.map((steps, idx) => (
            <div key ={idx}>
              <input
                type="text"
                name ="steps"
                className="recipe-form col-md-6"
                placeholder={`Step #${idx + 1}`}
                onChange={this.handleNameChange(idx)}
                ref={(input) => this.steps = input}/>
          <button type="button" onClick={this.handleAddSteps} className="small pull-left">+</button>
              <button type="button" onClick={this.handleRemoveSteps(idx)} className="small pull-left">-</button>
            </div>
          ))}
        </div>
      )
    }
  }

  export default connect()(AddStep);