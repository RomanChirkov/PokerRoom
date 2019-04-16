package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"./db"
	"./registration"

	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	id       int
	login    string
	mail     string
	password string
}

func (u User) String() string {
	return fmt.Sprintf("{id: %v, login: %s, mail: %s, password: %s }", u.id, u.login, u.mail, u.password)
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

func init() {
	db.InitDataBase()
}

func main() {
	defer db.Database.Close()
	http.HandleFunc("/", HomeRouterHandler)
	http.HandleFunc("/api", apiHendler)
	http.HandleFunc("/api/registerUser", registration.RegistrationHandler)
	err := http.ListenAndServe(":9000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
