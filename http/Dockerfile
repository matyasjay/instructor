FROM golang:1.18 as builder
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM alpine:latest
WORKDIR /root/

RUN apk --no-cache add curl
RUN curl -sfS https://dotenvx.sh/install.sh | sh

COPY --from=builder /app/.env* ./
COPY --from=builder /app/cmd/server/main.go .

EXPOSE 3333

CMD ["dotenvx", "run", "--", "./main"]
