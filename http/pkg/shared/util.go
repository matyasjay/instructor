package shared

import (
	"os"
	"time"

	"strings"
	"unicode"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

var secret = os.Getenv("JWT_SECRET")
var jwtSecret = []byte(secret)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) == nil
}

func GenerateJWT(userID string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func AssertInput[T any](c echo.Context, input T ) (T, error) {
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

func CamelCase(s string) string {
	runes := []rune(s)
	if len(runes) == 0 {
		return s
	}

	if IsAllUpper(s) {
		return strings.ToLower(s)
	}

	runes[0] = unicode.ToLower(runes[0])
	runes[len(runes) - 1] = unicode.ToLower(runes[len(runes) - 1])
	return string(runes)
}

