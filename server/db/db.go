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

const (
	UsetNotExist = byte(iota)
	UserLoginExist
	UserMailExist
	UserExist = byte(3)
)

// ExistUser возвращает:
// 000 если пользователя не существует
// 001 если существует пользователь с таким же логином
// 010 если существует пользователь с такой же почтой
// 011 если существует пользователь с такой же почтой и логином
func ExistUser(login, mail string) (byte, error) {
	queryStr := fmt.Sprintf("SELECT loginusers, mailusers FROM serverbd.users WHERE loginusers=\"%s\" OR mailusers=\"%s\"", login, mail)
	rows, err := Database.Query(queryStr)
	defer rows.Close()
	ok := UsetNotExist
	if err != nil {
		fmt.Println(err.Error())
		return ok, err
	}
	for user := make([]string, 2); rows.Next(); {
		err = rows.Scan(&user[0], &user[1])
		if err != nil {
			fmt.Println(err.Error())
			return ok, err
		}
		if user[0] == login {
			ok |= UserLoginExist
		}
		if user[1] == mail {
			ok |= UserMailExist
		}
	}
	return ok, nil
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
