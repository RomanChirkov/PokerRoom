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

    fetch("/api/registerUser", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(formData)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.status === "ok") {
          alert("ura");
          dispatch({
            type: SIGNUP_SUCCESS,
            payload: {}
          });
          return null;
        }
        if (data.status === "error") {
          alert("ne ura");
          dispatch({
            type: SIGNUP_FAIL,
            payload: {}
          });
          return null;
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: SIGNUP_FAIL,
          payload: {}
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
