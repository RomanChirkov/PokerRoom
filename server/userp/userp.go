package userp

type User struct {
	Login        string `json:"login"`
	Email        string `json:"email"`
	Password     string `json:"password"`
	ConfPassword string `json:"confPassword"`
	Token        string `json:"token"`
}

type SmallUser struct {
	Login string `json:"login"`
	Email string `json:"email"`
	Token string `json:"token"`
}
