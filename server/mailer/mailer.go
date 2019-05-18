package mailer

import (
	"fmt"

	"../handlers"
	"gopkg.in/gomail.v2"
)

type emailParams struct {
	host, login, password string
}

var currentEmailParams emailParams

func (ep emailParams) getEmail() string {
	return fmt.Sprintf("%s@%s", ep.login, ep.host)
}

func (ep emailParams) getSMTPHost() string {
	return fmt.Sprintf("smtp.%s", ep.host)
}

func InitMailer() {
	config := handlers.GetConfig("./mail.config")
	fmt.Println("Successful mailer config!")
	currentEmailParams = emailParams{config[0], config[1], config[2]}
}

func SendEmail(email, text string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", currentEmailParams.getEmail())
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Reset Key | PokerRoom")
	m.SetBody("text/html", fmt.Sprintf("<h1>Yours recovery key</h1><p>%s</p>", text))

	d := gomail.NewDialer(currentEmailParams.getSMTPHost(), 587, currentEmailParams.login, currentEmailParams.password)
	fmt.Println(m, d)
	return d.DialAndSend(m)
}
