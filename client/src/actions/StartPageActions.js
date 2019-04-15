export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SET_INPUT_DATA = "SET_INPUT_DATA";

export function signUpSubmit(formData = {}) {
  return dispatch => {
    dispatch({
      type: SIGNUP_REQUEST,
      payload: formData
    });

    //fetch to /api/registerUser
    setTimeout(
      (res = {}) => {
        if (res.status === "ok") {
          alert("ura");
          dispatch({
            type: SIGNUP_SUCCESS,
            payload: { login: "ok" }
          });
          return null;
        }
        if (res.status === "error") {
          alert("ne ura(");
          dispatch({
            type: SIGNUP_FAIL,
            payload: { login: "(" }
          });
          return null;
        }
        alert("??");
      },
      2000,
      { status: "ok" }
    );
  };
}

export function setInputData(inputData = {}) {
  return {
    type: SET_INPUT_DATA,
    payload: inputData
  };
}
