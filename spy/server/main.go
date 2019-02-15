package main

import (
	"fmt"
	_ "github.com/gorilla/websocket"
	"net/http"
)

func main() {
	http.HandleFunc("/tables", TablesHandler)
	http.HandleFunc("/waiters", WaitersHandler)

	fmt.Println("starting server at :8080")
	http.ListenAndServe(":8080", nil)
}
