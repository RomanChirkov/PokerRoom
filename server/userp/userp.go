package userp

type SmallUser struct {
	Login string `json:"login"`
	Email string `json:"email"`
	Token string `json:"token"`
}

type User struct {
	SmallUser
	Password     string `json:"password"`
	ConfPassword string `json:"confPassword"`
}

type PasswordCheker struct {
	Email        string `json:"email"`
	Password     string `json:"password"`
	ConfPassword string `json:"confPassword"`
	RecoveryKey  string `json:"recoveryKey"`
}
