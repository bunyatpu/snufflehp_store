import React,{ Component } from 'react';
import { Form,Image} from 'semantic-ui-react'
import wfPath from './images/wireframe.png'


class ImageFormUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
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

    this.props.setImage({
      file: file,
      imagePreviewUrl: reader.result
    })
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = imagePreviewUrl;
    } else {
      $imagePreview = wfPath;
    }

    return (
      <div className="previewComponent">
        <Image src={$imagePreview} fluid />
        <Form.Input 
          fluid 
          type="file"  
          name="imgFile"
          onChange={(e)=>this._handleImageChange(e)}
        />

      </div>
    )
  }

}

export default ImageFormUpload;