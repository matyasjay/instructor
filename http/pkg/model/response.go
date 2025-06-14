package model

type UserDetails struct {
	ID string
	Email string
	Name string
	Role string
	CreatedAt string
}

type UserResponse struct {
	WithError
	User   UserDetails
	Token  string
	Expire int
}

type CheckUserResponse struct {
	WithError
	User   User
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

type InputResponse struct {
	WithError
	Input  Input
}
