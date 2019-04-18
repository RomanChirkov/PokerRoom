package authentication

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"regexp"
	"strings"
	"unicode/utf8"

	"../db"
	"../handlers"
	"../responses"
	"../userp"

	_ "github.com/go-sql-driver/mysql"
)

const (
	fuckOffHere          = "Fuck off here"
	jsonErr              = "Error parsing json"
	userCheckErr         = "Error checking the presence of the user in the database"
	userExistingErr      = "Such user doesn't exist"
	passwordCheckErr     = "Error checking the presence of a password in the database"
	userEmLExisting      = "User with this login and email already exists!"
	userLExisting        = "User with this login already exists!"
	userEmExisting       = "User with this email already exists!"
	passMathingErr       = "Passwords do not match"
	passLengthErr        = "Password must be longer than 3 characters!"
	loginLengthErr       = "login must be longer than 3 characters!"
	incorectMail         = "Incorrect email entered!"
	dbWritingErr         = "Error writing to database"
	userRegistred        = "User successfully registered"
	userAuthorization    = "User successfully Authorization"
	userAuthorizationErr = "Invalid login or password"
	userLogOut           = "User successfully LogOut"
)

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
	responses.SetCookie(w, userValidation)
	responses.SendOkResponse(w, userAuthorization, userValidation)
}

func LogOutUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		fmt.Fprintf(w, fuckOffHere)
		return
	}
	user, err := r.Cookie("user")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Printf("\n\n%+v\n\n%s\n\n%s\n\n%+v\n\n", user, user.Name, user.Value, user.Value)

	re := regexp.MustCompile(` [\w]*`)
	login := strings.Trim(string(re.Find([]byte(user.Value))), " ")
	if login != "" {
		err := db.UpdateUserToken(login, handlers.GenerateToken())
		fmt.Println(err)
	}
	responses.DeleteCookie(w)
	responses.SendOkResponse(w, userLogOut, nil)
}

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
