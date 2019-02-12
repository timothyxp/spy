package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
	"strconv"
	"sync"
)

type Table struct {
	TableId int64 `json:"tableId,int64"`
	Players int   `json:"players,int"`
	Size    int   `json:"size,int"`
	Admin   int64 `json:"admin,int64"`
}

type Client struct {
	conn   *websocket.Conn
	userId int64
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

var Tables map[int64][]int64 = make(map[int64][]int64)
var TablesPlayers map[int64]Table = make(map[int64]Table)
var PlayersConnected map[int64]Client = make(map[int64]Client)
var MapMutex *sync.Mutex = &sync.Mutex{}

func NewPlayer(userId int64, conn *websocket.Conn) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	PlayersConnected[userId] = Client{
		userId: userId,
		conn:   conn,
	}
}

func NewTable(table *Table) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	TablesPlayers[table.TableId] = *table
	Tables[table.TableId] = append(Tables[table.TableId], table.Admin)
	go UpdateTables()
}

func TablesHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}

	userId, err := strconv.ParseInt(r.URL.Query().Get("userId"), 10, 64)

	if err != nil {
		fmt.Println("cant convert userId:", err)
		return
	}

	fmt.Println("user:", userId, "connect")

	go NewPlayer(userId, conn)

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
		fmt.Println("messageType:", string(messageType))
		table := &Table{}
		json.Unmarshal(event, table)
		table.Admin = userId
		go NewTable(table)
		fmt.Println(table)
		/*if err := conn.WriteMessage(messageType, event); err != nil {
			fmt.Println(err)
			return
		}*/
	}
}

func UpdateTables() {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	wg := &sync.WaitGroup{}
	var sendTables, err = json.Marshal(TablesPlayers)
	if err != nil {
		panic(err)
	}
	fmt.Println("json tables:", sendTables)
	for _, player := range PlayersConnected {
		wg.Add(1)
		go func() {
			defer wg.Done()
			err = player.conn.WriteMessage(1, sendTables)
		}()
	}
	wg.Wait()
}
