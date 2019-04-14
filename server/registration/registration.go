package registration

import (
	"encoding/json"
	//"database/sql"
	"fmt"
	"io/ioutil"
	"net/http"

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

	} else {

		ret = Response{"ok", fmt.Sprintf("%+v", str)}
		jsonMessage, _ := json.Marshal(ret)
		fmt.Println(w, "%s", jsonMessage)
		fmt.Fprintf(w, "%s", jsonMessage)

	}
}
