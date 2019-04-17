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

	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	Login        string `json:"login"`
	Mail         string `json:"mail"`
	Password     string `json:"password"`
	ConfPassword string `json:"confPassword"`
}

const (
	fuckOffHere           = "Fuck off here"
	jsonErr               = "Error parsing json"
	userCheckErr          = "Error checking the presence of the user in the database"
	userExistingErr       = "Such user doesn't exist"
	passwordCheckErr      = "Error checking the presence of a password in the database"
	userEmLExisting       = "User with this login and email already exists!"
	userLExisting         = "User with this login already exists!"
	userEmExisting        = "User with this email already exists!"
	passMathingErr        = "Passwords do not match"
	passLengthErr         = "Password must be longer than 3 characters!"
	loginLengthErr        = "login must be longer than 3 characters!"
	incorectMail          = "Incorrect mail entered!"
	dbWritingErr          = "Error writing to database"
	userRegistred         = "User successfully registered"
	userAuthorizathion    = "User successfully authorizathion"
	userAuthorizathionErr = "Invalid login or password"
)

func AuthorizathionUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Fprintf(w, fuckOffHere)
		return
	}
	var user User
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
	userValidation, err := db.ValidateUsers(user.Password, user.Login)
	if err != nil {
		responses.SendErrResponse(w, passwordCheckErr, err)
		return
	}
	if !userValidation {
		responses.SendErrResponse(w, userAuthorizathionErr, nil)
		return
	}
	fmt.Println(userValidation)
	responses.SendOkResponse(w, userAuthorizathion)
}

func RegistrationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Fprintf(w, fuckOffHere)
		return
	}
	var user User

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

	userExisting, err := db.ExistUser(user.Login, user.Mail)
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
	if ok, _ := handlers.ValidateEmail(user.Mail); !ok {
		responses.SendErrResponse(w, incorectMail, nil)
		return
	}
	if utf8.RuneCountInString(user.Login) < 4 {
		responses.SendErrResponse(w, loginLengthErr, nil)
		return
	}

	err = db.AddRows("INSERT INTO serverbd.users (loginusers, mailusers, passwordusers) VALUES (?, ?, MD5(?))", user.Login, user.Mail, user.Password)
	if err != nil {
		responses.SendErrResponse(w, dbWritingErr, err)
	} else {
		responses.SendOkResponse(w, userRegistred)
	}
}
