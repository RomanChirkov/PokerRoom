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
  CLEAR_FORM_DATA,
  SET_AUTH,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  VALIDATE_COOKIE_REQUEST,
  VALIDATE_COOKIE_SUCCESS,
  VALIDATE_COOKIE_FAIL,
  SEND_RECOVERY_KEY_REQUEST,
  SEND_RECOVERY_KEY_SUCCESS,
  SEND_RECOVERY_KEY_FAIL
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
  email: "",
  isAuth: false,
  isFetching: false,
  redirect: false
};

export function appReducer(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case SEND_RECOVERY_KEY_REQUEST:
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case VALIDATE_COOKIE_REQUEST:
      return { ...state, ...payload, isFetching: true };
    case SEND_RECOVERY_KEY_SUCCESS:
    case SEND_RECOVERY_KEY_FAIL:
    case SIGNUP_SUCCESS:
    case SIGNUP_FAIL:
    case LOGIN_SUCCESS:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
    case VALIDATE_COOKIE_SUCCESS:
    case VALIDATE_COOKIE_FAIL:
      return { ...state, ...payload, isFetching: false };
    case CLEAR_FORM_DATA:
      if (!state.isAuth) {
        return { ...state, ...payload };
      }
      return { ...state, password: "" };
    case SET_ALERT_HIDDEN:
      let ret = { ...state };
      ret.alert.hidden = payload;
      return ret;
    case SET_ALERT:
    case SET_INPUT_DATA:
    case SET_AUTH:
      return { ...state, ...payload };
    case SET_REDIRECT:
      return { ...state, redirect: payload };
    default:
      return { ...state };
  }
}
