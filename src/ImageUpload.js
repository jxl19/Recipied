import React from 'react';
import { connect } from 'react-redux';
import {uploadImage} from './reducer';
import './ImageUpload.css';

// https://codepen.io/hartzis/pen/VvNGZP
class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: ''};
    }
  
    handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      console.log('handle uploading-', this.state.file);
      this.props.dispatch(uploadImage(this.state.file));
    }
  
    handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img className ="img1" src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      }
      
      return (
        <div className="previewComponent">
          <form onSubmit={(e)=>this.handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this.handleImageChange(e)} />
            <button className="submitButton" 
              type="submit" 
              onClick={(e)=>this.handleSubmit(e)}>Upload Image</button>
          </form>
          <div className="imgPreview">
            {$imagePreview}
          </div>
        </div>
      )
    }
  }

export default connect()(ImageUpload);