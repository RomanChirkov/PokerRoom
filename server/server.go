package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"./authentication"
	"./db"
	"./mailer"

	_ "github.com/go-sql-driver/mysql"
)

func init() {
	db.InitDataBase()
	mailer.InitMailer()
}

func main() {
	defer db.Database.Close()
	http.HandleFunc("/", HomeRouterHandler)
	http.HandleFunc("/api", apiHendler)
	http.HandleFunc("/api/registerUser", authentication.RegistrationHandler)
	http.HandleFunc("/api/authorizationUser", authentication.AuthorizationUser)
	http.HandleFunc("/api/logOutUser", authentication.LogOutUser)
	http.HandleFunc("/api/validateCookie", authentication.ValidateCookie)
	http.HandleFunc("/api/sendRecoveryKey", authentication.SendRecoveryKey)
	http.HandleFunc("/api/validateRecoveryKey", authentication.ValidateRecoveryKey)
	http.HandleFunc("/api/changePassword", authentication.ChangePassword)
	err := http.ListenAndServe(":9000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func HomeRouterHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	for k, v := range r.Form {
		fmt.Println("key:", k)
		fmt.Println("val:", strings.Join(v, ""))
	}
	fmt.Fprintf(w, "PokerRoom")
}

func apiHendler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hellow, there is api page")
}
