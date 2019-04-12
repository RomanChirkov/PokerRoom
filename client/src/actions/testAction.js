export const testAction = () => dispatch => {
  dispatch({
    type: "TEST",
    payload: "result_of_simple_action"
  });
};

export const test1Action = () => dispatch => {
  dispatch({
    type: "XUI",
    payload: "otsosi pisos"
  });
};
