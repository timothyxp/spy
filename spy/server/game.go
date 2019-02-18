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
	Roles         []int
	picker        int
	turn          int
	team          int
	results       []int
	players       []int64
	voteAccept    []int64
	voteReject    []int64
	missionAccept []int64
	missionReject []int64
	playersConn   []*websocket.Conn
}

type GameEventArr struct {
	Type string `json:"type,[]byte"`
	Arr  []int  `json:"arr,[]int64"`
}

var GameTables map[int64]*Game = make(map[int64]*Game)
var GameMutex *sync.Mutex = &sync.Mutex{}

func getGameReference(tableId int64, size int64, userId int64, conn *websocket.Conn) *Game {
	GameMutex.Lock()
	defer GameMutex.Unlock()
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	game, ok := GameTables[tableId]
	if ok {
		game.players = append(game.players, userId)
		game.playersConn = append(game.playersConn, conn)
		return game
	}
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
	players := []int64{userId}
	playersConn := []*websocket.Conn{conn}
	game = &Game{
		Roles:         roles,
		picker:        0,
		turn:          1,
		team:          0,
		results:       make([]int, 0),
		players:       players,
		voteAccept:    make([]int64, 0),
		voteReject:    make([]int64, 0),
		missionAccept: make([]int64, 0),
		missionReject: make([]int64, 0),
		playersConn:   playersConn,
	}
	GameTables[tableId] = game
	return game
}

func Send(conn *websocket.Conn, data []byte) {
	err := conn.WriteMessage(1, data)
	if err != nil {
		fmt.Println("cant send data:", err)
	}
}

func SendToAll(conns []*websocket.Conn, data []byte) {
	for _, conn := range conns {
		go func(conn *websocket.Conn) {
			err := conn.WriteMessage(1, data)
			if err != nil {
				fmt.Println("cant send data:", err)
			}
		}(conn)
	}
}

func getMessage() {

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

	game := getGameReference(tableId, size, userId, conn)
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
