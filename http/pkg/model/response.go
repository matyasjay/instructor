package model

type UserResponse struct {
	WithError
	User   User
	Token  string
	Expire int
}

type CheckUserResponse struct {
	WithError
	UserID string
	Token  string
	Expire int
}

type ServiceResponse struct {
	Service
	Templates []Template
	Users     []User
}
