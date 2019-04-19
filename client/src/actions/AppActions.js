import { setAlertData } from "../modules/helpers";

export const SET_ALERT_HIDDEN = "SET_ALERT_HIDDEN";
export const SET_ALERT = "SET_ALERT";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_REQUEST = "LOGIN_REQUEST";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const SET_INPUT_DATA = "SET_INPUT_DATA";
export const SET_REDIRECT = "SET_REDIRECT";

export const CLEAR_FORM_DATA = "CLEAR_FORM_DATA";

export const SET_AUTH = "SET_AUTH";

export const VALIDATE_COOKIE_REQUEST = "VALIDATE_COOKIE_REQUEST";
export const VALIDATE_COOKIE_SUCCESS = "VALIDATE_COOKIE_SUCCESS";
export const VALIDATE_COOKIE_FAIL = "VALIDATE_COOKIE_FAIL";

export const SEND_RECOVERY_KEY_REQUEST = "SEND_RECOVERY_KEY_REQUEST";
export const SEND_RECOVERY_KEY_SUCCESS = "SEND_RECOVERY_KEY_SUCCESS";
export const SEND_RECOVERY_KEY_FAIL = "SEND_RECOVERY_KEY_FAIL";

export function sendRecoveryKey(email = "") {
  return dispatch => {
    dispatch({
      type: SEND_RECOVERY_KEY_REQUEST,
      payload: {}
    });

    fetch(`/api/sendRecoveryKey?email=${email}`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        const alert = setAlertData(data.status, data.message);
        if (data.status === "ok") {
          dispatch({
            type: SEND_RECOVERY_KEY_SUCCESS,
            payload: {
              alert,
              ...data.data,
              redirect: true
            }
          });
          return null;
        }
        if (data.status === "error") {
          dispatch({
            type: SEND_RECOVERY_KEY_FAIL,
            payload: { alert, isAuth: false }
          });
          return null;
        }
      })
      .catch(err => {
        console.error(err);
        const alert = setAlertData("error", err.message);
        dispatch({
          type: SEND_RECOVERY_KEY_FAIL,
          payload: { alert }
        });
      });
  };
}

export function validateCookie() {
  return dispatch => {
    dispatch({
      type: VALIDATE_COOKIE_REQUEST,
      payload: {}
    });

    fetch("/api/validateCookie", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        const alert = setAlertData(data.status, data.message);
        alert.hidden = true;
        if (data.status === "ok") {
          dispatch({
            type: VALIDATE_COOKIE_SUCCESS,
            payload: {
              alert,
              ...data.data,
              redirect: true,
              isAuth: true
            }
          });
          return null;
        }
        if (data.status === "error") {
          dispatch({
            type: VALIDATE_COOKIE_FAIL,
            payload: { alert, isAuth: false }
          });
          return null;
        }
      })
      .catch(err => {
        console.error(err);
        const alert = setAlertData("error", err.message);
        dispatch({
          type: VALIDATE_COOKIE_FAIL,
          payload: { alert, isAuth: true }
        });
      });
  };
}

export function setAuth(auth = false, userData = {}) {
  return {
    type: SET_AUTH,
    payload: { isAuth: auth, redirect: !auth, ...userData }
  };
}

export function logOutUser() {
  return dispatch => {
    dispatch({
      type: LOGOUT_REQUEST,
      payload: {}
    });

    fetch("/api/logOutUser", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        const alert = setAlertData(data.status, data.message);
        if (data.status === "ok") {
          alert.hidden = true;
          dispatch({
            type: LOGOUT_SUCCESS,
            payload: {
              alert,
              ...data.data,
              redirect: true,
              isAuth: false
            }
          });
          return null;
        }
        if (data.status === "error") {
          dispatch({
            type: LOGOUT_FAIL,
            payload: { alert, isAuth: false }
          });
          return null;
        }
      })
      .catch(err => {
        console.error(err);
        const alert = setAlertData("error", err.message);
        dispatch({
          type: LOGOUT_FAIL,
          payload: { alert, isAuth: true }
        });
      });
  };
}

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

export function logInUser(formData = {}) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: formData
    });

    fetch("/api/authorizationUser", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        const alert = setAlertData(data.status, data.message);
        if (data.status === "ok") {
          console.log(alert);
          alert.hidden = true;
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              alert,
              ...data.data,
              redirect: true,
              isAuth: true
            }
          });
          return null;
        }
        if (data.status === "error") {
          dispatch({
            type: LOGIN_FAIL,
            payload: { alert, isAuth: false }
          });
          return null;
        }
      })
      .catch(err => {
        console.error(err);
        const alert = setAlertData("error", err.message);
        dispatch({
          type: LOGIN_FAIL,
          payload: { alert, isAuth: true }
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
              email: "",
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
