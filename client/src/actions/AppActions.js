import { setAlertData } from "../modules/helpers";

export const SET_ALERT_HIDDEN = "SET_ALERT_HIDDEN";
export const SET_ALERT = "SET_ALERT";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_REQUEST = "LOGIN_REQUEST";

export const SET_INPUT_DATA = "SET_INPUT_DATA";
export const SET_REDIRECT = "SET_REDIRECT";

export const CLEAR_FORM_DATA = "CLEAR_FORM_DATA";

export function clearFormData() {
  return {
    type: CLEAR_FORM_DATA,
    payload: {
      password: "",
      confPassword: "",
      email: "",
      login: ""
    }
  };
}

export function setAlertHidden(hidden = true) {
  return {
    type: SET_ALERT_HIDDEN,
    payload: hidden
  };
}

export function setAlert(title, text, button, hidden) {
  let alert = setAlertData(title, text, button, hidden);
  return {
    type: SET_ALERT,
    payload: { alert }
  };
}

export function logInSubmit(formData = {}) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: formData
    });

    fetch("/api/loginUser", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        const alert = setAlertData(data.status, data.message);
        if (data.status === "ok") {
          console.log(alert);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              ...data.user,
              redirect: true
            }
          });
          return null;
        }
        if (data.status === "error") {
          dispatch({
            type: LOGIN_FAIL,
            payload: { alert }
          });
          return null;
        }
      })
      .catch(err => {
        console.error(err);
        const alert = setAlertData("error", err.message);
        dispatch({
          type: LOGIN_FAIL,
          payload: { alert }
        });
      });
  };
}

export function signUpSubmit(formData = {}) {
  return dispatch => {
    dispatch({
      type: SIGNUP_REQUEST,
      payload: formData
    });

    fetch("/api/registerUser", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        const alert = setAlertData(data.status, data.message);
        if (data.status === "ok") {
          console.log(alert);
          dispatch({
            type: SIGNUP_SUCCESS,
            payload: {
              password: "",
              confPassword: "",
              login: "",
              mail: "",
              redirect: true
            }
          });
          return null;
        }
        if (data.status === "error") {
          dispatch({
            type: SIGNUP_FAIL,
            payload: { alert }
          });
          return null;
        }
      })
      .catch(err => {
        console.error(err);
        const alert = setAlertData("error", err.message);
        dispatch({
          type: SIGNUP_FAIL,
          payload: { alert }
        });
      });
  };
}

export function setInputData(inputData = {}) {
  return {
    type: SET_INPUT_DATA,
    payload: inputData
  };
}

export function setRedirect(redirect = false) {
  return {
    type: SET_REDIRECT,
    payload: redirect
  };
}
