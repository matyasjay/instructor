package internal

import (
	"bufio"
	"bytes"
	"http/pkg/shared"
	"log"
	"os"
	"regexp"
	"strings"
)

func Rewrite() {
	path := "../../frontend/src/lib/types/endpoint.d.ts"

	content, err := os.ReadFile(path)
	if err != nil {
		log.Fatal(err)
	}

	// Regexes to match patterns
	exportRe := regexp.MustCompile(`\bexport\b`)
	interfaceRe := regexp.MustCompile(`^declare interface (\w+) \{$`)
	propertyRe := regexp.MustCompile(`^(\s*)([\w_]+)(\??):`)

	var output bytes.Buffer
	scanner := bufio.NewScanner(strings.NewReader(string(content)))

	inBlock := false

	for scanner.Scan() {
		line := scanner.Text()
		line = exportRe.ReplaceAllString(line, "declare")

		if matches := interfaceRe.FindStringSubmatch(line); matches != nil {
			name := matches[1]
			line = "declare type " + name + " = {"
			inBlock = true
			output.WriteString(line + "\n")
			continue
		}

		if inBlock {
			if strings.TrimSpace(line) == "}" {
				inBlock = false
				output.WriteString(line + "\n")
				continue
			}

			if matches := propertyRe.FindStringSubmatch(line); matches != nil {
				indent := matches[1]
				key := matches[2]
				newKey := shared.CamelCase(key)

				colonIndex := strings.Index(line, ":")
				if colonIndex != -1 {
					line = indent + newKey + line[colonIndex:]
				}
			}

			output.WriteString(line + "\n")
			continue
		}

		output.WriteString(line + "\n")
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	err = os.WriteFile(path, output.Bytes(), 0644)
	if err != nil {
		log.Fatal(err)
	}
}
