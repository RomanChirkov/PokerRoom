import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_REQUEST,
  SET_INPUT_DATA
} from "../actions/StartPageActions";

const initialState = {
  password: "",
  confPassword: "",
  newPassword: "",
  recoveryKey: 0,
  login: "",
  email: "",
  isAuth: false,
  isFetching: false
};

export function startPageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, ...action.payload, isFetching: true };
    case SIGNUP_SUCCESS:
      return { ...state, ...action.payload, isFetching: false };
    case SIGNUP_FAIL:
      return { ...state, ...action.payload, isFetching: false };
    case SET_INPUT_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
