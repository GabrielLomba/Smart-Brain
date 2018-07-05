import Clarifai from 'clarifai';

import {
  CHANGE_IMAGE_URL_INPUT_FIELD,
  DETECT_IMAGE_CLICK,
  CLEAR_IMAGE_URL,
  CHANGE_CURRENT_IMAGE_SIZE,
  CHANGE_ROUTE,
  SIGN_OUT_USER,
  REQUEST_FACE_DETECTION_PENDING,
  REQUEST_FACE_DETECTION_SUCCESS,
  REQUEST_FACE_DETECTION_ERROR,
  REGISTER_USER_PENDING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  SIGN_IN_USER_PENDING,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAIL,
  UPDATE_USER_RANK_PENDING,
  UPDATE_USER_RANK_SUCCESS,
  UPDATE_USER_RANK_FAIL
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

  dispatch({ type: DETECT_IMAGE_CLICK, payload: searchImage.imageUrlInput });
};

export const setCurrentImageSize = (width, height) => (dispatch) => {
  dispatch({ type: CHANGE_CURRENT_IMAGE_SIZE, payload: { width, height } });
  dispatch(requestFaceDetection());
};

export const updateUserRank = () => (dispatch, getState) => {
  const { signInOutUser } = getState();

  dispatch({ type: UPDATE_USER_RANK_PENDING });

  fetch('http://localhost:3001/image', {
    method: 'PUT',
    body: JSON.stringify({ 'id': signInOutUser.user.id }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      if (response.status >= 400) {
        throw Error('Unknown error');
      } else {
        return response.json();
      }
    })
    .then(entries => {
      dispatch({ type: UPDATE_USER_RANK_SUCCESS, payload: entries });
    })
    .catch(err => dispatch({ type: UPDATE_USER_RANK_FAIL, payload: err.message }))
}

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

export const signInUser = (user) => (dispatch) => {
  dispatch({ type: SIGN_IN_USER_PENDING });

  fetch('http://localhost:3001/signin', { method: 'POST', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } })
    .then(response => {
      if (response.status >= 400) {
        if (response.status === 401) {
          throw Error('Invalid username and password combination.');
        } else {
          throw Error('Unknown error');
        }
      } else {
        return response.json();
      }
    })
    .then(user => {
      dispatch({ type: SIGN_IN_USER_SUCCESS, payload: user });
      dispatch({ type: UPDATE_USER_RANK_SUCCESS, payload: user.entries });
      dispatch(changeRoute('home'));
    })
    .catch(err => dispatch({ type: SIGN_IN_USER_FAIL, payload: err.message }));
}

export const signOutUser = () => (dispatch) => {
  dispatch({ type: SIGN_OUT_USER });
  dispatch({ type: CLEAR_IMAGE_URL });
  dispatch(changeRoute('signin'));
}

export const registerUser = (user) => (dispatch) => {
  dispatch({ type: REGISTER_USER_PENDING });

  fetch('http://localhost:3001/register', { method: 'POST', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } })
    .then(async response => {
      const payload = await response.json();
      if(response.status >= 400) {
        throw Error(payload);
      } else {
        dispatch({ type: REGISTER_USER_SUCCESS, payload });
        dispatch(changeRoute('signin'));
      }
    })
    .catch(err => dispatch({ type: REGISTER_USER_FAIL, payload: err.message }))
};
