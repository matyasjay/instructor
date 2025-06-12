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
	WithError
	Service
	Templates []Template
	Users     []User
}

type TemplateResponse struct {
	WithError
	ServiceID string
	Template  Template
}
