package authentication

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"unicode/utf8"

	"../db"
	"../handlers"
	"../responses"
	"../userp"
)

const (
	fuckOffHere            = "Fuck off here"
	jsonErr                = "Error parsing json"
	userCheckErr           = "Error checking the presence of the user in the database"
	userExistingErr        = "Such user doesn't exist"
	passwordCheckErr       = "Error checking the presence of a password in the database"
	userEmLExisting        = "User with this login and email already exists!"
	userLExisting          = "User with this login already exists!"
	userEmExisting         = "User with this email already exists!"
	passMathingErr         = "Passwords do not match"
	passLengthErr          = "Password must be longer than 3 characters!"
	loginLengthErr         = "login must be longer than 3 characters!"
	incorectMail           = "Incorrect email entered!"
	dbWritingErr           = "Error writing to database"
	dbReadingErr           = "Error reading to database"
	userRegistred          = "User successfully registered"
	userAuthorization      = "User successfully Authorization"
	userAuthorizationErr   = "Invalid login or password"
	userLogOut             = "User successfully LogOut"
	parsingCookieErr       = "Parsing cookie error"
	validateFail           = "Fail validation"
	validateSuccessful     = "Successful validation"
	emailSendingFail       = "Fail email sending"
	emailSendingSuccessful = "Successful email sending"
	urlParamsGettingFail   = "Need URL param is missing"
)

func SendRecoveryKey(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		fmt.Fprintf(w, fuckOffHere)
		return
	}
	fmt.Println("SENDING")
	emails, ok := r.URL.Query()["email"]
	if !ok || len(emails[0]) < 1 {
		responses.SendErrResponse(w, urlParamsGettingFail, fmt.Errorf(urlParamsGettingFail))
		return
	}

	email := emails[0]

	err := handlers.SendEmail(email, "1234")
	if err != nil {
		responses.SendErrResponse(w, emailSendingFail, err)
		return
	}
	responses.SendOkResponse(w, emailSendingSuccessful, nil)
}

func ValidateCookie(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		fmt.Fprintf(w, fuckOffHere)
		return
	}
	login, err := r.Cookie(responses.LoginCookie)
	if err != nil {
		responses.SendErrResponse(w, parsingCookieErr, err)
		return
	}
	email, err := r.Cookie(responses.EmailCookie)
	if err != nil {
		responses.SendErrResponse(w, parsingCookieErr, err)
		return
	}
	token, err := r.Cookie(responses.TokenCookie)
	if err != nil {
		responses.SendErrResponse(w, parsingCookieErr, err)
		return
	}
	ok, err := db.ValidateUserByCookie(login.Value, email.Value, token.Value)
	if err != nil {
		responses.SendErrResponse(w, dbReadingErr, err)
		return
	}
	user := userp.SmallUser{login.Value, email.Value, token.Value}
	if !ok {
		responses.SendErrResponse(w, validateFail, fmt.Errorf(validateFail))
		return
	}
	responses.SendOkResponse(w, validateSuccessful, user)
	return
}

// AuthorizationUser проверяет полученные данные формы,
// при успешной проверке присваивает cookie
func AuthorizationUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Fprintf(w, fuckOffHere)
		return
	}
	var user userp.User
	data, err := ioutil.ReadAll(r.Body)
	fmt.Printf("%s\n", data)
	if err != nil {
		responses.SendErrResponse(w, jsonErr, err)
		return
	}
	err = json.Unmarshal(data, &user)
	if err != nil {
		responses.SendErrResponse(w, jsonErr, err)
		return
	}
	userExisting, err := db.ExistUser(user.Login, "")
	if err != nil {
		responses.SendErrResponse(w, userCheckErr, err)
		return
	}
	if userExisting != db.UserLoginExist && userExisting != db.UserMailExist {
		responses.SendErrResponse(w, userExistingErr, nil)
		return
	}
	userValidation, err := db.ValidateUser(user.Password, user.Login)
	if err != nil {
		responses.SendErrResponse(w, passwordCheckErr, err)
		return
	}
	if userValidation.Login == "" || userValidation.Email == "" {
		responses.SendErrResponse(w, userAuthorizationErr, nil)
		return
	}
	newToken := handlers.GenerateToken()
	err = db.UpdateUserToken(userValidation.Login, newToken)
	if err == nil {
		userValidation.Token = newToken
	} else {
		fmt.Println(err)
	}
	responses.SetCookies(w, userValidation)
	responses.SendOkResponse(w, userAuthorization, userValidation)
}

// LogOutUser удаляет cookie и генерирует новый токен, если пользователь был обнаружен
func LogOutUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		fmt.Fprintf(w, fuckOffHere)
		return
	}
	login, err := r.Cookie(responses.LoginCookie)
	if err != nil {
		fmt.Println(err)
	}

	// re := regexp.MustCompile(` [\w]*`)
	// login := strings.Trim(string(re.Find([]byte(user.Value))), " ")
	if login.Value != "" {
		err := db.UpdateUserToken(login.Value, handlers.GenerateToken())
		fmt.Println(err)
	}
	responses.DeleteCookies(w)
	responses.SendOkResponse(w, userLogOut, nil)
}

// RegistrationHandler проверяет полученные данные формы,
// при успешной проверке заносит в бд данные пользователя и шифрует пароль
func RegistrationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Fprintf(w, fuckOffHere)
		return
	}
	var user userp.User

	data, err := ioutil.ReadAll(r.Body)
	fmt.Printf("%s\n", data)
	if err != nil {
		responses.SendErrResponse(w, jsonErr, err)
		return
	}

	err = json.Unmarshal(data, &user)
	if err != nil {
		responses.SendErrResponse(w, jsonErr, err)
		return
	}

	userExisting, err := db.ExistUser(user.Login, user.Email)
	if err != nil {
		responses.SendErrResponse(w, userCheckErr, err)
		return
	}

	if userExisting == db.UserExist {
		responses.SendErrResponse(w, userEmLExisting, nil)
		return
	}
	if userExisting == db.UserLoginExist {
		responses.SendErrResponse(w, userLExisting, nil)
		return
	}
	if userExisting == db.UserMailExist {
		responses.SendErrResponse(w, userEmExisting, nil)
		return
	}

	if user.Password != user.ConfPassword {
		responses.SendErrResponse(w, passMathingErr, nil)
		return
	}
	if utf8.RuneCountInString(user.Password) < 4 {
		responses.SendErrResponse(w, passLengthErr, nil)
		return
	}
	if ok, _ := handlers.ValidateEmail(user.Email); !ok {
		responses.SendErrResponse(w, incorectMail, nil)
		return
	}
	if utf8.RuneCountInString(user.Login) < 4 {
		responses.SendErrResponse(w, loginLengthErr, nil)
		return
	}
	user.Token = handlers.GenerateToken()

	err = db.AddRows("INSERT INTO serverbd.user (login, email, password, token) VALUES (?, ?, MD5(?), ?)", user.Login, user.Email, user.Password, user.Token)
	if err != nil {
		responses.SendErrResponse(w, dbWritingErr, err)
		return
	}
	responses.SendOkResponse(w, userRegistred, nil)
}
