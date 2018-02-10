import React from 'react';
import { connect } from 'react-redux';
import {uploadImage} from '../reducers/reducer';
import {addFiles} from '../actions/action';
import './ImageUpload.css';

class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: ''};
    }
  
    handleSubmit(e) {
      e.preventDefault();
      var fileExt = this.state.file.name.split('.').pop();
      this.props.dispatch(uploadImage(this.state.file));
      window.alert("uploaded");
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
        this.props.dispatch(addFiles(this.state.file));
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
        <div className="previewComponent image-form">
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


const mapStateToProps = (state) => ({
  file: state.file,
  imagePreviewUrl: state.imagePreviewUrl
})

export default connect(mapStateToProps)(ImageUpload);