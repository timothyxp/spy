package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
)

type Table struct {
	TableID int64 `json:"tableId,int64"`
	Players int   `json:"players,int"`
	Size    int   `json:"size,int"`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

var Tables map[int64]bool = make(map[int64]bool)

func TablesHandler(w http.ResponseWriter, r *http.Request) {
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
		messageType, event, err := conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}
		table := &Table{}
		json.Unmarshal(event, table)
		fmt.Println(table)
		if err := conn.WriteMessage(messageType, event); err != nil {
			fmt.Println(err)
			return
		}
	}
}
