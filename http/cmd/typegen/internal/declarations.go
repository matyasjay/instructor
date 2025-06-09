package internal

import (
	"http/pkg/shared"
	"log"
	"os"
	"strings"

	"github.com/skia-dev/go2ts"
)

func Declarations() {
	declarations := "../../frontend/src/lib/types/endpoint.d.ts"

	ts := go2ts.New()
	ts.Add(shared.User{})
	ts.Add(shared.UserInput{})
	ts.Add(shared.Template{})
	ts.Add(shared.TemplateInput{})
	ts.Add(shared.Service{})
	ts.Add(shared.ServiceInput{})

	f, err := os.Create(declarations)
	if err != nil {
		log.Fatal(err)
	}

	err = ts.Render(f)
	if err != nil {
		log.Fatal(err)
	}

	if err = f.Close(); err != nil {
		log.Fatal(err)
	}

	content, err := os.ReadFile(declarations)
	if err != nil {
		log.Fatal(err)
	}

	modified := strings.ReplaceAll(string(content), "export", "declare")

	err = os.WriteFile(declarations, []byte(modified), 0644)
	if err != nil {
		log.Fatal(err)
	}
}
