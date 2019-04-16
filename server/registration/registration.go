package registration

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

func AuthorizathionUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Fprintf(w, "Пошел нахуй отсюда")
		return
	}
	var user User
	data, err := ioutil.ReadAll(r.Body)
	fmt.Printf("%s\n", data)
	if err != nil {
		responses.SendErrResponse(w, "ошибка парсинга JSON", err)
		return
	}
	err = json.Unmarshal(data, &user)
	if err != nil {
		responses.SendErrResponse(w, "ошибка парсинга JSON", err)
		return
	}
	userExisting, err := db.ExistUser(user.Login, user.Mail)
	if err != nil {
		responses.SendErrResponse(w, "ошибка проверки наличия пользователя в бд", err)
		return
	}
	if userExisting != db.UserLoginExist && userExisting != db.UserMailExist {
		responses.SendErrResponse(w, "такого пользователя не сущесвтует", nil)
		return
	}
	userValidation, err := db.ValidateUsers(user.Password)
	if err != nil {
		responses.SendErrResponse(w, "ошибка проверки наличия пароля в бд", err)
		return
	}
	fmt.Println(userValidation)
}

func RegistrationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Fprintf(w, "Пошел нахуй отсюда")
		return
	}
	var user User

	data, err := ioutil.ReadAll(r.Body)
	fmt.Printf("%s\n", data)
	if err != nil {
		responses.SendErrResponse(w, "ошибка парсинга JSON", err)
		return
	}

	err = json.Unmarshal(data, &user)
	if err != nil {
		responses.SendErrResponse(w, "ошибка парсинга JSON", err)
		return
	}

	userExisting, err := db.ExistUser(user.Login, user.Mail)
	if err != nil {
		responses.SendErrResponse(w, "ошибка проверки наличия пользователя в бд", err)
		return
	}

	if userExisting == db.UserExist {
		responses.SendErrResponse(w, "пользователь с таким логином и почтой уже существует!", nil)
		return
	}
	if userExisting == db.UserLoginExist {
		responses.SendErrResponse(w, "пользователь с таким логином уже существует!", nil)
		return
	}
	if userExisting == db.UserMailExist {
		responses.SendErrResponse(w, "пользователь с такой почтой уже существует!", nil)
		return
	}

	if user.Password != user.ConfPassword {
		responses.SendErrResponse(w, "пароли не совпадают", nil)
		return
	}
	if utf8.RuneCountInString(user.Password) < 4 {
		responses.SendErrResponse(w, "пароль должен быть длинее 3 символов!", nil)
		return
	}
	if ok, _ := handlers.ValidateEmail(user.Mail); !ok {
		responses.SendErrResponse(w, "введена неккоректная почта!", nil)
		return
	}
	if utf8.RuneCountInString(user.Login) < 4 {
		responses.SendErrResponse(w, "логин должен быть длиннее 3х символов!", nil)
		return
	}

	err = db.AddRows("INSERT INTO serverbd.users (loginusers, mailusers, passwordusers) VALUES (?, ?, MD5(?))", user.Login, user.Mail, user.Password)
	if err != nil {
		responses.SendErrResponse(w, "ошибка записи в базу данных", err)
	} else {
		responses.SendOkResponse(w, "пользователь успешно зарегестрирован")
	}
}
