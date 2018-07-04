import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  setCurrentImageSize,
  updateUserRank
} from '../../actions';
import './FaceRecognition.css';

const mapStateToProps = state => ({
  imageUrl: state.detectImage.currentImageUrl,
  box: state.requestFaceDetection.box
});

const mapDispatchToProps = dispatch => ({
  updateUserRank: () => dispatch(updateUserRank()),
  onImageSizeChange: (width, height) => dispatch(setCurrentImageSize(width, height))
});

class FaceRecognition extends Component {
  onImgLoad = ({ target: img }) => {
    this.props.updateUserRank();
    this.props.onImageSizeChange(img.offsetWidth, img.offsetHeight);
  }

  render() {
    const { imageUrl, box } = this.props;
    return (
      <div className='flex justify-center ma'>
        <div className='absolute mt2'>
          <img id='inputImage' alt='faces' src={imageUrl} width='500px' height='auto' onLoad={this.onImgLoad}/>
          <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaceRecognition);