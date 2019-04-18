export function getUserCookie() {
  let cookie = getCookie();
  if (!cookie || !cookie.user) {
    return {};
  }
  return parseCookieToObj(cookie.user);
}

export function parseCookieToObj(cookie = "{}") {
  return cookie
    .replace(/{|}| /g, "")
    .split(",")
    .reduce((res, c) => {
      if (typeof res === "string") {
        const [key, val] = c.split(":");
        const [key1, val1] = res.split(":");
        let ret = {};
        return Object.assign(ret, { [key]: val }, { [key1]: val1 });
      }

      const [key, val] = c.split(":");
      return Object.assign(res, { [key]: val });
    });
}

export function getCookie() {
  return document.cookie.split(";").reduce((res, c) => {
    const [key, val] = c
      .trim()
      .split("=")
      .map(decodeURIComponent);
    const allNumbers = str => /^\d+$/.test(str);
    try {
      return Object.assign(res, {
        [key]: allNumbers(val) ? val : JSON.parse(val)
      });
    } catch (e) {
      return Object.assign(res, { [key]: val });
    }
  }, {});
}

export function validateEmail(email = "") {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function setAlertData(
  title = "",
  text = "",
  button = "ok",
  hidden = false
) {
  return {
    title,
    text,
    button,
    hidden
  };
}

export const LoginLengthErr = 0b0001;
export const ValidateEmailErr = 0b0010;
export const PasswordLengthErr = 0b0100;
export const PasswordEqualityErr = 0b1000;

export function verifyRegistrationForm(login, email, password, confPassword) {
  var ok = 0b0000;
  var message = "";
  var title = "Incorrect data entered";
  login !== undefined &&
    login.length < 4 &&
    (ok |= LoginLengthErr) &&
    (message += "\n- nickname length must be more than 3 characters");

  email !== undefined &&
    !validateEmail(email) &&
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
}
