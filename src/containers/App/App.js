import React, { Component } from 'react';

import { connect } from 'react-redux';
import Particles from 'react-particles-js';

import Navigation from '../Navigation/Navigation';
import SignIn from '../SignIn/SignIn';
import Register from '../Register/Register';
import Logo from '../../components/Logo/Logo';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import Rank from '../../components/Rank/Rank';
import './App.css';
import {
  requestFaceDetection,
  setImageUrlInputField,
  detectImage,
  setCurrentImageSize
} from '../../actions';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const mapStateToProps = state => ({
  input: state.searchImage.imageUrlInput,
  error: state.requestFaceDetection.error,
  route: state.changeRoute.route
});

const mapDispatchToProps = dispatch => ({
  onImageUrlInputChange: (event) => dispatch(setImageUrlInputField(event.target.value)),
  onRequestFaceDetection: () => dispatch(requestFaceDetection()),
  onDetectImage: () => dispatch(detectImage()),
  onCurrentImageSizeChange: (width, height) => dispatch(setCurrentImageSize(width, height))
});

class App extends Component {

  render() {
    const { route, onDetectImage, onImageUrlInputChange } = this.props;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation/>
        {route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={onImageUrlInputChange} onSubmit={onDetectImage} />
            <FaceRecognition />
          </div>
          : (route === 'signin'
            ? <SignIn />
            : <Register />
          )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
