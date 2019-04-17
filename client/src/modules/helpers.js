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

export const LoginLengthErr = 0b0001;
export const ValidateEmailErr = 0b0010;
export const PasswordLengthErr = 0b0100;
export const PasswordEqualityErr = 0b1000;

export const verifyRegistrationForm = (login, mail, password, confPassword) => {
  var ok = 0b0000;
  var message = "";
  var title = "Incorrect data entered";
  login !== undefined &&
    login.length < 4 &&
    (ok |= LoginLengthErr) &&
    (message += "\n- nickname length must be more than 3 characters");

  mail !== undefined &&
    !validateEmail(mail) &&
    (ok |= ValidateEmailErr) &&
    (message += "\n- invalid email entered");

  password !== undefined &&
    password.length < 4 &&
    (ok |= PasswordLengthErr) &&
    (message += "\n- password length must be more than 4 characters");

  password !== undefined &&
    confPassword !== undefined &&
    password !== confPassword &&
    (ok |= PasswordEqualityErr) &&
    (message += "\n- passwords do not match");

  return [ok, title, message];
};
