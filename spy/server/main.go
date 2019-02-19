package main

import (
	"fmt"
	_ "github.com/gorilla/websocket"
	"net/http"
)

func MainHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Страницы игры Spy"))
}

func main() {
	http.HandleFunc("/", MainHandler)
	http.HandleFunc("/tables", TablesHandler)
	http.HandleFunc("/waiters", WaitersHandler)
	http.HandleFunc("/game", GameHandler)

	fmt.Println("starting server at :8080")
	http.ListenAndServe(":8080", nil)
}
