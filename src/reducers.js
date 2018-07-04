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
    case CLEAR_IMAGE_URL:
      return { ...state, currentImageUrl: '' }
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
  isSignedIn: false,
  user: {},
  error: ''
};

export const signInOutUser = (state = initialStateSignInOut, action = {}) => {
  switch (action.type) {
    case SIGN_IN_USER_PENDING:
      return { ...state, isSignedIn: false };
    case SIGN_IN_USER_SUCCESS:
      return { ...state, isSignedIn: true, user: action.payload };
    case SIGN_IN_USER_FAIL:
      return { ...state, isSignedIn: false, error: action.payload };
    case SIGN_OUT_USER:
      return { ...state, isSignedIn: false, user: {} };
    default:
      return state;
  }
}

const initialStateRegisterUser = {
  isPending: false,
  user: {},
  error: ''
};

export const registerUser = (state = initialStateRegisterUser, action = {}) => {
  switch (action.type) {
    case REGISTER_USER_PENDING:
      return { ...state, isPending: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, isPending: false, user: action.payload }
    case REGISTER_USER_FAIL:
      return { ...state, isPending: false, error: action.payload }
    default:
      return state;
  }
}

const initialStateUpdateUserRank = {
  isPending: false,
  entries: 0,
  error: ''
};

export const updateUserRank = (state = initialStateUpdateUserRank, action = {}) => {
  switch (action.type) {
    case UPDATE_USER_RANK_PENDING:
      return { ...state, isPending: true };
    case UPDATE_USER_RANK_SUCCESS:
      return { ...state, isPending: false, entries: action.payload }
    case UPDATE_USER_RANK_FAIL:
      return { ...state, isPending: false, error: action.payload }
    default:
      return state;
  }
}