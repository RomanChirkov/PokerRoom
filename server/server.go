package main

import (
	"bufio"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	id       int
	login    string
	password string
}

func (u User) String() string {
	return fmt.Sprintf("{id: %v, login: %s, password: %s }", u.id, u.login, u.password)
}

var database *sql.DB

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	rows, err := database.Query("select * from serverbd.users")
	if err != nil {
		fmt.Println(err)
		fmt.Println("error")
	}
	fmt.Println(rows)
	defer rows.Close()
	users := []User{}
	for rows.Next() {
		p := User{}
		err := rows.Scan(&p.id, &p.login, &p.password)
		if err != nil {
			fmt.Println(err)
			continue
		}
		users = append(users, p)
	}
	fmt.Fprintf(w, fmt.Sprintf("%v", users))
}

func HomeRouterHandler(w http.ResponseWriter, r *http.Request) {
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
func getConfig() (config []string) {
	file, err := os.Open("./db.config")
	if err != nil {
		panic("Ошибка при чтении конфига:" + err.Error())
	}
	defer file.Close()

	var data string

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		data = scanner.Text()
	}
	config = strings.Split(data, ",")

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
	}

	return
}
func init() {
	conf := getConfig()
	fmt.Println("Connecting to database...")
	connString := fmt.Sprintf("%s:%s@/serverbd", conf[0], conf[1])
	db, err := sql.Open("mysql", connString)
	if err != nil {
		panic(err.Error())
	}
	fmt.Println(db)
	database = db
}

func main() {
	defer database.Close()
	http.HandleFunc("/api/bd", IndexHandler)
	http.HandleFunc("/", HomeRouterHandler)
	http.HandleFunc("/api", apiHendler)
	err := http.ListenAndServe(":9000", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
