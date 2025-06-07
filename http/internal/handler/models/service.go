package models

type PromptTemplate struct {
	ID          string
	Name        string
	Description string
	Template    string
}

type Service struct {
	ID          string
	Name        string
	Description string
	Private     bool
	Templates   []uint8
	Users       []uint8
	CreatedAt   string
	UpdatedAt   string
}

type ServiceOnUser struct {
	UserID    string
	ServiceID string
}
