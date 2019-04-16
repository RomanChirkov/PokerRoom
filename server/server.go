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
