package instructor

func (r *mutationResolver) CreateTemplate(ctx context.Context, input model.PromptTemplateInput) (*model.PromptTemplate, error) {
	id := uuid.NewString()
	tmpl := &model.PromptTemplate{
		ID:          id,
		Name:        input.Name,
		Description: input.Description,
		Template:    input.Template,
		Variables:   convertToVariables(input.Variables),
	}
	// TODO: Save tmpl to DB or in-memory store
	return tmpl, nil
}

func (r *mutationResolver) SubmitPrompt(ctx context.Context, input model.PromptInput) (*model.PromptResult, error) {
	// TODO: Lookup template, substitute values, call OpenAI
	result := &model.PromptResult{
		ID:        uuid.NewString(),
		Input:     input.Values,
		Output:    "Mocked response for now",
		CreatedAt: time.Now().Format(time.RFC3339),
	}
	return result, nil
}

func (r *queryResolver) GetTemplate(ctx context.Context, id string) (*model.PromptTemplate, error) {
	// TODO: Retrieve template by ID
	return nil, nil
}

func (r *queryResolver) ListTemplates(ctx context.Context) ([]*model.PromptTemplate, error) {
	// TODO: List templates
	return []*model.PromptTemplate{}, nil
}
