package responses

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Response struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

func SendErrResponse(w http.ResponseWriter, text string, err error) {
	message := fmt.Sprintf("%s", text)
	if err != nil {
		message += fmt.Sprintf(": %s", err.Error())
	}
	jsonMessage, _ := json.Marshal(Response{"error", message})
	send := fmt.Sprintf("%s", jsonMessage)
	fmt.Println(send)
	fmt.Fprintf(w, send)
}

func SendOkResponse(w http.ResponseWriter, text string) {
	jsonMessage, _ := json.Marshal(Response{"ok", text})
	send := fmt.Sprintf("%s", jsonMessage)
	fmt.Println(send)
	fmt.Fprintf(w, send)
}
