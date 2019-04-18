package responses

import (
	"encoding/json"
	"fmt"
	"net/http"

	"../userp"
)

type Response struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func SendErrResponse(w http.ResponseWriter, text string, err error) {
	message := fmt.Sprintf("%s", text)
	if err != nil {
		message += fmt.Sprintf(": %s", err.Error())
	}
	jsonMessage, _ := json.Marshal(Response{"error", message, nil})
	send := fmt.Sprintf("%s", jsonMessage)
	fmt.Println(send)
	fmt.Fprintf(w, send)
}

func SendOkResponse(w http.ResponseWriter, text string, data interface{}) {
	jsonMessage, _ := json.Marshal(Response{"ok", text, data})
	send := fmt.Sprintf("%s", jsonMessage)
	fmt.Println(send)
	fmt.Fprintf(w, send)
}

func SetCookie(w http.ResponseWriter, user userp.SmallUser) {
	cookie := http.Cookie{Name: "user", Value: fmt.Sprintf("{login: %s, email: %s, token: %s}", user.Login, user.Email, user.Token), Path: "/"}
	http.SetCookie(w, &cookie)
}

func DeleteCookie(w http.ResponseWriter) {
	cookie := http.Cookie{Name: "user", MaxAge: -1, Path: "/"}
	http.SetCookie(w, &cookie)
}
