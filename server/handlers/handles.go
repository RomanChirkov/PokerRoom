package handlers

import (
	"fmt"
	"regexp"
)

func ValidateEmail(email string) (matched bool, err error) {
	pattern := `^\w+@\w+\.\w+$`
	matched, err = regexp.Match(pattern, []byte(email))
	if err != nil {
		fmt.Println("ошибка матчига")
		fmt.Println(err.Error())
		matched = false
	}
	return
}
