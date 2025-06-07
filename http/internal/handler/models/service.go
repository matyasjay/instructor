package models

type Service struct {
	ID          string
	Name        string
	Description string
	Private     bool
	Templates   []PromptTemplate
	Users       []User
	CreatedAt   string
	UpdatedAt   string
}

type ServiceOnUser struct {
	UserID    string
	ServiceID string
}
