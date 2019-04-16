export const validateEmail = (mail = "") => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(mail);
};

export const setAlertData = (
  title = "",
  text = "",
  button = "ok",
  hidden = false
) => {
  return {
    title,
    text,
    button,
    hidden
  };
};
