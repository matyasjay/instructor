package main

import "http/cmd/typegen/internal"

func main() {
	internal.Parse()
	internal.Declarations()
	internal.Rewrite()
}
