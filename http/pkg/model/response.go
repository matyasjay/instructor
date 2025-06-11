package model

type UserResponse struct {
	WithError
	User  User
	Token string
}

type ServiceResponse struct {
	Service
	Templates []Template
	Users     []User
}
