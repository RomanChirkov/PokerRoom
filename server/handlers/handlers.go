package handlers

import (
	"fmt"
	"math/rand"
	"regexp"
	"time"
)

// ValidateEmail проверяет полученный эмейл на валидность тип ___@__.__
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

var src = rand.NewSource(time.Now().UnixNano())

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!~_#1234567890"
const (
	letterIdxBits = 8                    // 6 bits to represent a letter index
	letterIdxMask = 1<<letterIdxBits - 1 // All 1-bits, as many as letterIdxBits
	letterIdxMax  = 63 / letterIdxBits   // # of letter indices fitting in 63 bits
)

// GenerateToken генерирует случаную строку на 32 символа
func GenerateToken() string {
	n := 32
	b := make([]byte, n)
	// A src.Int63() generates 63 random bits, enough for letterIdxMax characters!
	for i, cache, remain := n-1, src.Int63(), letterIdxMax; i >= 0; {
		if remain == 0 {
			cache, remain = src.Int63(), letterIdxMax
		}
		if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
			b[i] = letterBytes[idx]
			i--
		}
		cache >>= letterIdxBits
		remain--
	}

	return string(b)
}
