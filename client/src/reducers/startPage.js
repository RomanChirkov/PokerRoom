import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_REQUEST,
  SET_INPUT_DATA,
  SET_REDIRECT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "../actions/StartPageActions";

const initialState = {
  password: "",
  confPassword: "",
  newPassword: "",
  recoveryKey: 0,
  login: "",
  mail: "",
  isAuth: false,
  isFetching: false,
  redirect: false
};

export function startPageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, ...action.payload, isFetching: true };
    case SIGNUP_SUCCESS:
      return { ...state, ...action.payload, isFetching: false };
    case SIGNUP_FAIL:
      return { ...state, ...action.payload, isFetching: false };
    case LOGIN_REQUEST:
      return { ...state, ...action.payload, isFetching: true };
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload, isFetching: false };
    case LOGIN_FAIL:
      return { ...state, ...action.payload, isFetching: false };
    case SET_INPUT_DATA:
      return { ...state, ...action.payload };
    case SET_REDIRECT:
      return { ...state, redirect: action.payload };
    default:
      return state;
  }
}
