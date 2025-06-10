package model

type UserResponse struct {
	WithError
	User  User
	Token string
}
