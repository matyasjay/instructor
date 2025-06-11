package util

import (
	"strings"
	"unicode"

	"github.com/labstack/echo/v4"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

func AssertInput[T any](c echo.Context, input T) (T, error) {
	if err := c.Bind(&input); err != nil {
		return input, err
	}
	return input, nil
}

func IsAllUpper(s string) bool {
	for _, r := range s {
		if !unicode.IsUpper(r) {
			return false
		}
	}
	return len(s) > 0
}

func IsAllLower(s string) bool {
	for _, r := range s {
		if !unicode.IsLower(r) {
			return false
		}
	}
	return len(s) > 0
}

func CamelCase(s string) string {
	runes := []rune(s)
	if len(runes) == 0 {
		return s
	}

	if IsAllUpper(s) {
		return strings.ToLower(s)
	}

	runes[0] = unicode.ToLower(runes[0])
	runes[len(runes)-1] = unicode.ToLower(runes[len(runes)-1])
	return string(runes)
}

var acronyms = map[string]string{
	"id": "ID",
	"Id": "ID",
	"iD": "ID",
}

func PascalCase(s string) string {
	if s == "" {
		return s
	}

	if IsAllUpper(s) {
		caser := cases.Title(language.Und)
		return caser.String(strings.ToLower(s))
	}

	runes := []rune(s)
	runes[0] = unicode.ToUpper(runes[0])

	result := string(runes)

	for match, upper := range acronyms {
		result = strings.ReplaceAll(result, match, upper)
	}

	return result
}

func DbmlToStruct(dbmlType string) string {
	switch strings.ToLower(dbmlType) {
	case "int", "integer":
		return "int"
	case "float", "double", "decimal", "numeric":
		return "float64"
	case "boolean", "bool":
		return "bool"
	case "varchar", "char", "text", "string", "uuid":
		return "string"
	case "datetime", "timestamp", "date", "time":
		return "string"
	default:
		return dbmlType
	}
}
