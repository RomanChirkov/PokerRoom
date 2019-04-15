package db

import (
	"bufio"
	"database/sql"
	"fmt"
	"os"
	"strings"

	_ "github.com/go-sql-driver/mysql"
)

var Database sql.DB

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

func InitDataBase() {
	conf := getConfig()
	fmt.Println("Connecting to database...")
	connString := fmt.Sprintf("%s:%s@/serverbd", conf[0], conf[1])
	db, err := sql.Open("mysql", connString)
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("Successful connection")
	Database = *db
}

func AddRows(query string, args ...interface{}) error {
	result, err := Database.Exec(query, args...)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(result)
	return err
}
// func main() {
// 	defer database.Close()
// 	http.HandleFunc("/api/bd", IndexHandler)
// 	http.HandleFunc("/", HomeRouterHandler)
// 	http.HandleFunc("/api", apiHendler)
// 	http.HandleFunc("/api/registerUser", registration.RequestHandler)
// 	err := http.ListenAndServe(":9000", nil)
// 	if err != nil {
// 		log.Fatal("ListenAndServe: ", err)
// 	}
// }
