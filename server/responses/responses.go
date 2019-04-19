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

func SetCookie(w http.ResponseWriter, name, value string, maxAge int) {
	cookie := http.Cookie{Name: name, Value: value, Path: "/", MaxAge: maxAge}
	http.SetCookie(w, &cookie)
}

const (
	LoginCookie = "login"
	EmailCookie = "email"
	TokenCookie = "token"
)

func SetCookies(w http.ResponseWriter, user userp.SmallUser) {
	SetCookie(w, LoginCookie, user.Login, 0)
	SetCookie(w, EmailCookie, user.Email, 0)
	SetCookie(w, TokenCookie, user.Token, 0)
}

func DeleteCookies(w http.ResponseWriter) {
	SetCookie(w, LoginCookie, "", -1)
	SetCookie(w, EmailCookie, "", -1)
	SetCookie(w, TokenCookie, "", -1)
}
