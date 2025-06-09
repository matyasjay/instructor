package shared

type Service struct {
	ID          string
	Name        string
	Description string
	Private     bool
	Templates   []Template
	Users       []User
	CreatedAt   string
	UpdatedAt   string
}

type ServiceInput struct {
	WithUser
	Name        string `json:"name"`
	Private     bool   `json:"private"`
	Description string `json:"description"`
}

type ServiceOnUser struct {
	UserID    string
	ServiceID string
}

type Template struct {
	ID          string
	Name        string
	Description string
	Template    string
	CreatedAt   string
	UpdatedAt   string
}

type TemplateInput struct {
	ID          string `json:"id"`
	User        string `json:"user"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Template    string `json:"template"`
}

type TemplateOnServices struct {
	TemplateID string
	ServiceID  string
}

type User struct {
	ID           string `json:"id"`
	Email        string `json:"email"`
	Password     string `json:"-"`
	PasswordHash string `json:"-"`
	Name         string `json:"name"`
	CreatedAt    string `json:"createdAt"`
	UpdatedAt    string `json:"updatedAt"`
}

type UserInput struct {
	WithUser
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"-"`
}

type UserResponse struct {
	User  User
	Token string
}
