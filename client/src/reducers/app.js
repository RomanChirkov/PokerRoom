import {
  SET_ALERT_HIDDEN,
  SET_ALERT,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_REQUEST,
  SET_INPUT_DATA,
  SET_REDIRECT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_FORM_DATA
} from "../actions/AppActions";

const initialState = {
  alert: {
    title: "",
    text: "",
    button: "ok",
    hidden: true
  },
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

export function appReducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case CLEAR_FORM_DATA:
      return { ...state, ...payload };
    case SET_ALERT_HIDDEN:
      let ret = { ...state };
      ret.alert.hidden = payload;
      return ret;
    case SET_ALERT:
      return { ...state, ...payload };
    case SIGNUP_REQUEST:
      return { ...state, ...payload, isFetching: true };
    case SIGNUP_SUCCESS:
      return { ...state, ...payload, isFetching: false };
    case SIGNUP_FAIL:
      return { ...state, ...payload, isFetching: false };
    case LOGIN_REQUEST:
      return { ...state, ...payload, isFetching: true };
    case LOGIN_SUCCESS:
      return { ...state, ...payload, isFetching: false };
    case LOGIN_FAIL:
      return { ...state, ...payload, isFetching: false };
    case SET_INPUT_DATA:
      return { ...state, ...payload };
    case SET_REDIRECT:
      return { ...state, redirect: payload };
    default:
      return { ...state };
  }
}
