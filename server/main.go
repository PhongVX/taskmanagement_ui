package main

import (
	"fmt"
	"log"
	"net/http"

	"gopkg.in/macaron.v1"
)

const (
	ADDRESS_PORT = ":4444"
)

func main() {
	m := macaron.Classic()
	renderer := macaron.Renderer()
	m.Use(renderer)
	m.Get("/*", func(ctx *macaron.Context) {
		ctx.HTML(200, "index", nil)
	})
	m.Use(macaron.Static("dist"))
	http.Handle("/", m)
	fmt.Println("listening on localhost:" + ADDRESS_PORT)
	err := http.ListenAndServe(ADDRESS_PORT, nil)
	if err != nil {
		log.Fatal(err)
	}
}
