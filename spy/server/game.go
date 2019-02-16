package main

import (
	_ "encoding/json"
	"fmt"
	_ "github.com/gorilla/websocket"
	"net/http"
	"strconv"
	"sync"
)

type Game struct {
}

var GameTables map[int64]*Game = make(map[int64]*Game)
var GameMutex *sync.Mutex = &sync.Mutex{}

func getGameReference(tableId int64) *Game {
	GameMutex.Lock()
	defer GameMutex.Unlock()
	game, ok := GameTables[tableId]
	if ok {
		return game
	}
	game = &Game{}
	return game
}

func GameHandler(w http.ResponseWriter, r *http.Request) {
	_, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	userId, err := strconv.ParseInt(r.URL.Query().Get("userId"), 10, 64)
	if err != nil {
		fmt.Println("cant convert userID:", err)
		return
	}
	tableId, err := strconv.ParseInt(r.URL.Query().Get("tableId"), 10, 64)
	if err != nil {
		fmt.Println("cant convert tableID:", err)
		return
	}

	game := getGameReference(tableId)
	fmt.Println("player connect:", userId, game)
}
