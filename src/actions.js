import Clarifai from 'clarifai';

import {
  CHANGE_IMAGE_URL_INPUT_FIELD,
  DETECT_IMAGE_CLICK,
  CHANGE_CURRENT_IMAGE_SIZE,
  CHANGE_ROUTE,
  SIGN_IN_USER,
  REGISTER_USER,
  SIGN_OUT_USER,
  REQUEST_FACE_DETECTION_PENDING,
  REQUEST_FACE_DETECTION_SUCCESS,
  REQUEST_FACE_DETECTION_ERROR
} from './constants';

const app = new Clarifai.App({
  apiKey: 'f541ff5770dd47ccb8c47f05c93b8811'
});

export const setImageUrlInputField = (input) => ({
  type: CHANGE_IMAGE_URL_INPUT_FIELD,
  payload: input
});

export const detectImage = () => (dispatch, getState) => {
  const { searchImage } = getState();

  dispatch({ type: DETECT_IMAGE_CLICK, payload: searchImage.imageUrlInput});
};

export const setCurrentImageSize = (width, height) => (dispatch) => {
  dispatch({ type: CHANGE_CURRENT_IMAGE_SIZE, payload: { width, height }});
  dispatch(requestFaceDetection());
};

export const changeRoute = (route) => ({
  type: CHANGE_ROUTE,
  payload: route
});

export const requestFaceDetection = () => (dispatch, getState) => {
  const { detectImage, changeCurrentImageSize } = getState();
  const { currentImageWidth, currentImageHeight } = changeCurrentImageSize;

  dispatch({ type: REQUEST_FACE_DETECTION_PENDING });
  app.models.predict(Clarifai.FACE_DETECT_MODEL, detectImage.currentImageUrl)
    .then(data => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const box = {
        leftCol: clarifaiFace.left_col * currentImageWidth,
        topRow: clarifaiFace.top_row * currentImageHeight,
        rightCol: currentImageWidth - (clarifaiFace.right_col * currentImageWidth),
        bottomRow: currentImageHeight - (clarifaiFace.bottom_row * currentImageHeight)
      };
      dispatch({ type: REQUEST_FACE_DETECTION_SUCCESS, payload: box })
    })
    .catch(error => dispatch({ type: REQUEST_FACE_DETECTION_ERROR, payload: error }));
}

export const signInUser = () => (dispatch) => {
  dispatch({ type: SIGN_IN_USER });
  dispatch(changeRoute('home'));
}

export const signOutUser = () => (dispatch) => {
  dispatch({ type: SIGN_OUT_USER });
  dispatch(changeRoute('signin'));
}

export const registerUser = (user) => (dispatch) => {
  dispatch({
    type: REGISTER_USER,
    payload: user
  });
  dispatch(changeRoute('home'));
};
