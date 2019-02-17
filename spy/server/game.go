package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"math/rand"
	"net/http"
	"strconv"
	"sync"
	"time"
)

type Game struct {
	Roles []int
}

type GameEventArr struct {
	Type string `json:"type,[]byte"`
	Arr  []int  `json:"arr,[]int64"`
}

var GameTables map[int64]*Game = make(map[int64]*Game)
var GameMutex *sync.Mutex = &sync.Mutex{}

func getGameReference(tableId int64, size int64) *Game {
	GameMutex.Lock()
	defer GameMutex.Unlock()
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	game, ok := GameTables[tableId]
	if ok {
		return game
	}
	game = &Game{}
	roles := make([]int, size)
	spy := Rules[size].spy
	for i := 0; i < spy; i++ {
		roles[i] = 0
	}
	for i := spy; i < int(size); i++ {
		roles[i] = 1
	}
	for i := 0; i < int(size); i++ {
		ind := r.Intn(i + 1)
		cop := roles[ind]
		roles[ind] = roles[i]
		roles[i] = cop
	}
	game.Roles = roles
	return game
}

func Send(conn *websocket.Conn, data []byte) {
	err := conn.WriteMessage(1, data)
	if err != nil {
		fmt.Println("cant send data:", err)
	}
}

func GameHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
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
	size, err := strconv.ParseInt(r.URL.Query().Get("size"), 10, 64)
	if err != nil {
		fmt.Println("cant convert size:", err)
		return
	}

	defer func() {
		fmt.Println("user:", userId, "leave from game:", tableId)
		r.Body.Close()
	}()

	game := getGameReference(tableId, size)
	fmt.Println("player connect:", userId, game)
	roles, _ := json.Marshal(GameEventArr{
		Type: "roles",
		Arr:  game.Roles,
	})
	go Send(conn, roles)
	for {
		_, event, err := conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println(event)
	}
}
