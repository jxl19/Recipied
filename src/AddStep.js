import React from 'react';
import { connect } from 'react-redux';
import './AddIngredient.css';
class AddStep extends React.Component {
    constructor() {
      super();
      this.state = {
        name: '',
        steps: [{ name: '' }],
      };
    }
    
    handleSubmit = (evt) => {
      const { name, steps } = this.state;
      alert(`Incorporated: ${name} with ${steps.length} steps`);
    }
    
    handleAddSteps = () => {
      this.setState({ steps: this.state.steps.concat([{ name: '' }]) });
    }
    
    handleRemoveSteps = (idx) => () => {
      this.setState({ steps: this.state.steps.filter((s, sidx) => idx !== sidx) });
    }
    
    render() {    
      return (
        <div className="steps">
          {this.state.steps.map((steps, idx) => (
            <div>
              <input
                type="text"
                name ="steps"
                className="recipe-form col-md-6"
                placeholder={`Step #${idx + 1}`}
                value={steps.name}/>
          <button type="button" onClick={this.handleAddSteps} className="small pull-left">+</button>
              <button type="button" onClick={this.handleRemoveSteps(idx)} className="small pull-left">-</button>
            </div>
          ))}
        </div>
      )
    }
  }

  export default connect()(AddStep);