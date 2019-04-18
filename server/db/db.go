package db

import (
	"bufio"
	"database/sql"
	"fmt"
	"os"
	"strings"

	"../userp"
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
func ExistUser(login, email string) (byte, error) {
	queryStr := fmt.Sprintf("SELECT login, email FROM serverbd.user WHERE login=\"%s\" OR email=\"%s\"", login, email)
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
		if user[1] == email {
			ok |= UserMailExist
		}
	}
	return ok, nil
}
func ValidateUser(password, login string) (user userp.SmallUser, err error) {
	queryStr := fmt.Sprintf("SELECT login, email, token FROM serverbd.user WHERE password=MD5(\"%s\") AND login=\"%s\"", password, login)
	rows, err := Database.Query(queryStr)
	defer rows.Close()
	fmt.Println(rows)
	if err != nil {
		fmt.Println(err.Error())
	}
	if rows.Next() {
		err = rows.Scan(&user.Login, &user.Email, &user.Token)
	}
	return user, err
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

func UpdateUserToken(login, token string) error {
	fmt.Println("login - " + login)
	query := fmt.Sprintf("UPDATE serverbd.user SET token=\"%s\" WHERE (login=\"%s\");", token, login)
	result, err := Database.Exec(query)
	fmt.Println(result)
	return err
}
