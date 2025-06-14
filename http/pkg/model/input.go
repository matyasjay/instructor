package model

type PostUserInput struct {
	WithUser
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"-"`
}

type PostTemplateInput struct {
	WithUser
	Name        string           `json:"name"`
	Description string           `json:"description"`
	Template    string           `json:"template"`
	Input       []PostInputInput `json:"input"`
	ServiceID   string           `json:"serviceId"`
}

type PostInputInput struct {
	Input       string `json:"input"`
	Type        string `json:"type"`
	Description string `json:"description"`
}

type PostServiceInput struct {
	WithUser
	Name        string `json:"name"`
	Private     bool   `json:"private"`
	Description string `json:"description"`
}
