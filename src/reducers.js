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

const initialStateImageUrlInput = {
  imageUrlInput: ''
};

export const searchImage = (state = initialStateImageUrlInput, action = {}) => {
  switch (action.type) {
    case CHANGE_IMAGE_URL_INPUT_FIELD:
      return { ...state, imageUrlInput: action.payload };
    default:
      return state;
  }
}

const initialStateImageUrl = {
  currentImageUrl: ''
};

export const detectImage = (state = initialStateImageUrl, action = {}) => {
  switch (action.type) {
    case DETECT_IMAGE_CLICK:
      return { ...state, currentImageUrl: action.payload };
    default:
      return state;
  }
}

const initialStateRoute = {
  currentRoute: ''
};

export const changeRoute = (state = initialStateRoute, action = {}) => {
  switch (action.type) {
    case CHANGE_ROUTE:
      return { ...state, route: action.payload };
    default:
      return state;
  }
}

const initialStateCurrentImageSize = {
  currentImageHeight: 0,
  currentImageWidth: 0
};

export const changeCurrentImageSize = (state = initialStateCurrentImageSize, action = {}) => {
  switch (action.type) {
    case CHANGE_CURRENT_IMAGE_SIZE:
      return { ...state, currentImageHeight: action.payload.height, currentImageWidth: action.payload.width };
    default:
      return state;
  }
}

const initialStateFaceDetection = {
  isPending: false,
  box: {},
  error: ''
}

export const requestFaceDetection = (state = initialStateFaceDetection, action = {}) => {
  switch (action.type) {
    case REQUEST_FACE_DETECTION_PENDING:
      return { ...state, isPending: true };
    case REQUEST_FACE_DETECTION_SUCCESS:
      return { ...state, box: action.payload, isPending: false };
    case REQUEST_FACE_DETECTION_ERROR:
      return { ...state, error: action.payload, isPending: false };
    default:
      return state;
  }
}

const initialStateSignInOut = {
  isSignedIn: false
};

export const signInOutUser = (state = initialStateSignInOut, action = {}) => {
  switch (action.type) {
    case SIGN_IN_USER:
      return { ...state, isSignedIn: true };
    case SIGN_OUT_USER:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
}

const initialStateRegisterUser = {
  user: {}
};

export const registerUser = (state = initialStateRegisterUser, action = {}) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}