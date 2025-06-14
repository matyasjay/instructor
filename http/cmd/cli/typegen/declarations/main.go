package main

import (
	"bufio"
	"bytes"
	"http/pkg/model"
	"http/pkg/util"
	"log"
	"os"
	"regexp"
	"strings"

	"github.com/skia-dev/go2ts"
)

var declarationPath = "../frontend/src/lib/types/endpoint.d.ts"

func main() {
	ts := go2ts.New()
	ts.Add(model.User{})
	ts.Add(model.PostUserInput{})
	ts.Add(model.UserResponse{})
	ts.Add(model.Template{})
	ts.Add(model.PostTemplateInput{})
	ts.Add(model.TemplateResponse{})
	ts.Add(model.Input{})
	ts.Add(model.PostInputInput{})
	ts.Add(model.InputResponse{})
	ts.Add(model.Service{})
	ts.Add(model.PostServiceInput{})
	ts.Add(model.ServiceResponse{})

	f, err := os.Create(declarationPath)
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

	content, err := os.ReadFile(declarationPath)
	if err != nil {
		log.Fatal(err)
	}

	modified := strings.ReplaceAll(string(content), "export", "declare")

	err = os.WriteFile(declarationPath, []byte(modified), 0644)
	if err != nil {
		log.Fatal(err)
	}

	content, err = os.ReadFile(declarationPath)
	if err != nil {
		log.Fatal(err)
	}

	exportRe := regexp.MustCompile(`\bexport\b`)
	interfaceRe := regexp.MustCompile(`^declare interface (\w+) \{$`)
	propertyRe := regexp.MustCompile(`^(\s*)([\w_]+)(\??):`)
	anyRe := regexp.MustCompile(`[\s]any;$`)

	scanner := bufio.NewScanner(strings.NewReader(string(content)))

	inBlock := false

	var buffer bytes.Buffer

	for scanner.Scan() {
		line := scanner.Text()
		line = exportRe.ReplaceAllString(line, "declare")
		line = anyRe.ReplaceAllString(line, " unknown;")

		if matches := interfaceRe.FindStringSubmatch(line); matches != nil {
			name := matches[1]
			line = "declare type " + name + " = {"
			inBlock = true
			buffer.WriteString(line + "\n")
			continue
		}

		if inBlock {
			if strings.TrimSpace(line) == "}" {
				inBlock = false
				buffer.WriteString(line + "\n")
				continue
			}

			if matches := propertyRe.FindStringSubmatch(line); matches != nil {
				indent := matches[1]
				key := matches[2]
				newKey := util.CamelCase(key)

				colonIndex := strings.Index(line, ":")
				if colonIndex != -1 {
					line = indent + newKey + line[colonIndex:]
				}
			}

			buffer.WriteString(line + "\n")
			continue
		}

		buffer.WriteString(line + "\n")
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	err = os.WriteFile(declarationPath, buffer.Bytes(), 0644)
	if err != nil {
		log.Fatal(err)
	}
}
