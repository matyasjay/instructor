package models

type PromptTemplate struct {
	ID          string
	Name        string
	Description string
	Template    string
	CreatedAt   string
	UpdatedAt   string
}

type PromptInput struct {
	ID         string
	TemplateID string
	Input      []byte
	CreatedAt  string
	UpdatedAt  string
}

type TemplateOnServices struct {
	TemplateID string
	ServiceID  string
}
