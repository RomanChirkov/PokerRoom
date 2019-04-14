package registration
import (
	"encoding/json"
	//"database/sql"
	"fmt"
	"net/http"
	"io/ioutil"

	_ "github.com/go-sql-driver/mysql"
)
type Users struct {
	Login    string `json:"login"`
	Mail string	`json:"mail"`
	Password string	`json:"password"`
	Confpassword string	`json:"confpassword"`
}

func RequestHandler(w http.ResponseWriter, r *http.Request){
	var data []byte
	data, _ = ioutil.ReadFile("test.json")
	var str Users
	_ = json.Unmarshal(data, &str)
	if str.Password != str.Confpassword{
		status := "error"
		fmt.Fprintf(w, "Пароли не совпадают", status)
	}
	//fmt.Fprintf(w, "Login:", resp.Login, "Mail:", resp.Mail, "Password:", resp.Password, "Confirm:", resp.Confpassword)
	fmt.Fprintf(w, str.Login, str.Mail, str.Password, str.Confpassword)
}