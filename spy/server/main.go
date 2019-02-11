package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func handler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}

	userId := r.URL.Query().Get("userId")
	if userId != "undefined" && userId != "" {
		fmt.Println("user:", userId, "connect")
	} else {
		fmt.Println("uncorrect userId:", userId)
	}

	defer func() {
		fmt.Println("used:", userId, "unconnect")
		r.Body.Close()
	}()

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println(messageType, p)
		if err := conn.WriteMessage(messageType, p); err != nil {
			fmt.Println(err)
			return
		}
	}
}

func main() {
	http.HandleFunc("/tables", handler)

	fmt.Println("starting server at :8080")
	http.ListenAndServe(":8080", nil)
}
