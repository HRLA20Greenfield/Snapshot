import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import $ from 'jquery';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'vfitlscn';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/hrla20/auto/upload';

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       uploadedFileCloudinaryUrl: '',
       title: '',
    },
    this.onDrop = this.onDrop.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.updateInput = this.updateInput.bind(this)
  }
  
  onDrop(files, rejectedFiles) {
    if(rejectedFiles) {
      console.log('there was an error uploading: ', rejectedFiles)
    }
    
      this.setState( {
        uploadedFile: files[0]
      });

      this.handleImageUpload(files[0]);
    
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, res) => {
      if(err) {
        console.log('there was an error: ', err);
      }
      if(res.body.secure_url !== '') {
        console.log('test');
        this.setState({
          uploadedFileCloudinaryUrl: res.body.secure_url
        });
        console.log('this is the state', this.state);
      }
    })

  }

  updateInput(event) {
    this.setState({
      title: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop} multiple={false} />
        <input type='text' value={this.state.title} onChange={this.updateInput} placeholder='Name your post...'  />
        <button onClick={this.submitPost} >Submit</button>
      </div>
    );
  }
};

export default Uploader;