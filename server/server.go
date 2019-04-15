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

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println(db.Database.Ping())
	rows, err := db.Database.Query("select * from serverbd.users")
	if err != nil {
		fmt.Println(err)
		fmt.Println("error")
	}
	fmt.Println(rows)
	defer rows.Close()
	users := []User{}
	for rows.Next() {
		p := User{}
		err := rows.Scan(&p.id, &p.login, &p.mail, &p.password)
		if err != nil {
			fmt.Println("errorrrrrrrrrrrrr\n")
			fmt.Println(err)
			continue
		}
		users = append(users, p)
	}
	fmt.Fprintf(w, fmt.Sprintf("%v", users))
}

func HomeRouterHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("%s", r.Method)
	r.ParseForm()
	fmt.Println("scheme", r.URL.Scheme)

	fmt.Println(r.Form["url_long"])
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
	http.HandleFunc("/api/bd", IndexHandler)
	http.HandleFunc("/", HomeRouterHandler)
	http.HandleFunc("/api", apiHendler)
	http.HandleFunc("/api/registerUser", registration.RequestHandler)
	err := http.ListenAndServe(":9000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
