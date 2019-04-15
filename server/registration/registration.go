package registration

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"unicode/utf8"

	//"../db"

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

func RequestHandler(w http.ResponseWriter, r *http.Request) {
	var data []byte
	var str User
	var ret Response
	data, _ = ioutil.ReadFile("./registration/test.json")
	err := json.Unmarshal(data, &str)

	if err != nil {

		errMessage := fmt.Sprintf("Ошибка парсинга JSON: %s", err.Error())
		fmt.Printf("\nerror: %v\n", err)
		fmt.Println(errMessage)
		ret = Response{"error", errMessage}
		jsonMessage, _ := json.Marshal(ret)
		fmt.Fprintf(w, "%s", jsonMessage)

	} else if str.Password != str.ConfPassword {

		errMessage := "Пароли не совпадают!"
		ret := Response{"error", errMessage}
		jsonMessage, _ := json.Marshal(ret)
		fmt.Fprintf(w, "%s", jsonMessage)

	}else if utf8.RuneCountInString(str.Password) < 4 {

		errMessage := "Пароль должен быть длинее 3 символов!"
		ret := Response{"error", errMessage}
		jsonMessage, _ := json.Marshal(ret)
		fmt.Fprintf(w, "%s", jsonMessage)

	} else {

		//err = db.AddRows("insert into serverbd.users (loginusers, mailusers, passwordusers) values (?, ?, ?)", str.Login, str.Mail, str.Password)
		if err != nil {
			ret = Response{"error", fmt.Sprintf("%s", err.Error())}
		} else {
			ret = Response{"ok", fmt.Sprintf("%+v", str)}
		}
		jsonMessage, _ := json.Marshal(ret)
		fmt.Println(w, "%s", jsonMessage)
		fmt.Fprintf(w, "%s", jsonMessage)
	}
}
