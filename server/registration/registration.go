package registration

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"regexp"
	"unicode/utf8"

	"../db"

	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	Login        string `json:"login"`
	Mail         string `json:"mail"`
	Password     string `json:"password"`
	ConfPassword string `json:"confPassword"`
}

type Response struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

func sendErrResponse(w http.ResponseWriter, text string, err error) {
	message := fmt.Sprintf("%s", text)
	if err != nil {
		message += fmt.Sprintf(": %s", err.Error())
	}
	jsonMessage, _ := json.Marshal(Response{"error", message})
	send := fmt.Sprintf("%s", jsonMessage)
	fmt.Println(send)
	fmt.Fprintf(w, send)
}

func sendOkResponse(w http.ResponseWriter, text string) {
	jsonMessage, _ := json.Marshal(Response{"ok", text})
	send := fmt.Sprintf("%s", jsonMessage)
	fmt.Println(send)
	fmt.Fprintf(w, send)
}

func ValidateEmail(email string) (matched bool, err error) {
	pattern := `^\w+@\w+\.\w+$`
	matched, err = regexp.Match(pattern, []byte(email))
	if err != nil {
		fmt.Println("ошибка матчига")
		fmt.Println(err.Error())
		matched = false
	}
	return
}

func RequestHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Fprintf(w, "Пошел нахуй отсюда")
		return
	}
	var user User

	data, err := ioutil.ReadAll(r.Body)
	fmt.Printf("%s\n", data)
	if err != nil {
		sendErrResponse(w, "ошибка парсинга JSON", err)
		return
	}

	err = json.Unmarshal(data, &user)
	if err != nil {
		sendErrResponse(w, "ошибка парсинга JSON", err)
		return
	}

	userExisting, err := db.ExistUser(user.Login, user.Mail)
	if err != nil {
		sendErrResponse(w, "ошибка проверки наличия пользователя в бд", err)
		return
	}

	if userExisting == db.UserExist {
		sendErrResponse(w, "пользователь с таким логином и почтой уже существует!", nil)
		return
	}
	if userExisting == db.UserLoginExist {
		sendErrResponse(w, "пользователь с таким логином уже существует!", nil)
		return
	}
	if userExisting == db.UserMailExist {
		sendErrResponse(w, "пользователь с такой почтой уже существует!", nil)
		return
	}

	if user.Password != user.ConfPassword {
		sendErrResponse(w, "пароли не совпадают", nil)
		return
	}
	if utf8.RuneCountInString(user.Password) < 4 {
		sendErrResponse(w, "пароль должен быть длинее 3 символов!", nil)
		return
	}
	if ok, _ := ValidateEmail(user.Mail); !ok {
		sendErrResponse(w, "введена неккоректная почта!", nil)
		return
	}
	if utf8.RuneCountInString(user.Login) < 4 {
		sendErrResponse(w, "логин должен быть длиннее 3х символов!", nil)
		return
	}

	err = db.AddRows("INSERT INTO serverbd.users (loginusers, mailusers, passwordusers) VALUES (?, ?, MD5(?))", user.Login, user.Mail, user.Password)
	if err != nil {
		sendErrResponse(w, "ошибка записи в базу данных", err)
	} else {
		sendOkResponse(w, "пользователь успешно зарегестрирован")
	}
}
