package model

type PostUserInput struct {
	WithUser
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"-"`
}

type PostTemplateInput struct {
	WithUser
	Name        string `json:"name"`
	Description string `json:"description"`
	Template    string `json:"template"`
}

type PostTemplateInputInput struct {
	WithUser
	Name     string `json:"name"`
	Template string `json:"template"`
}

type PostServiceInput struct {
	WithUser
	Name        string `json:"name"`
	Private     bool   `json:"private"`
	Description string `json:"description"`
}
