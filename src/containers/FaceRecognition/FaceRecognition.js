import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  setCurrentImageSize
} from '../../actions';
import './FaceRecognition.css';

const mapStateToProps = state => ({
  imageUrl: state.detectImage.currentImageUrl,
  box: state.requestFaceDetection.box
});

const mapDispatchToProps = dispatch => ({
  onImageSizeChange: (width, height) => dispatch(setCurrentImageSize(width, height))
});

class FaceRecognition extends Component {
  onImgLoad = ({ target: img }) => {
    console.log(img);
    this.props.onImageSizeChange(img.offsetWidth, img.offsetHeight);
  }

  render() {
    const { imageUrl, box } = this.props;
    return (
      <div className='flex justify-center ma'>
        <div className='absolute mt2'>
          <img id='inputImage' alt='faces' src={imageUrl} width='500px' height='auto' onLoad={this.onImgLoad} />
          <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceRecognition);