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
	table  int64
}

type Event struct {
	Type     string `json:"type,[]byte"`
	TableId  int64  `json:"tableId,int64"`
	PlayerId int64  `json:"playerId,int64"`
}

func (this *Client) Send(data []byte) {
	err := this.conn.WriteMessage(1, data)
	if err != nil {
		fmt.Println(err)
	}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

var Tables map[int64][]int64 = make(map[int64][]int64)
var Waiters map[int64][]Client = make(map[int64][]Client)
var TablesPlayers map[int64]Table = make(map[int64]Table)
var PlayersConnected map[int64]Client = make(map[int64]Client)
var MapMutex *sync.Mutex = &sync.Mutex{}

func NewPlayer(userId int64, conn *websocket.Conn) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	PlayersConnected[userId] = Client{
		userId: userId,
		conn:   conn,
		table:  -1,
	}
	player := PlayersConnected[userId]
	sendTables, _ := json.Marshal(TablesPlayers)
	(player).Send(sendTables)
}

func DeletePlayer(userId int64) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	delete(PlayersConnected, userId)
}

func ConnectToTable(userId int64, tableId int64) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	table := TablesPlayers[tableId]
	if table.Players == table.Size {
		return
	}
	table.Players++
	Tables[tableId] = append(Tables[tableId], userId)

	Connect := Event{
		Type:    "Connect",
		TableId: tableId,
	}

	ConnectJson, err := json.Marshal(Connect)
	if err != nil {
		fmt.Println(err)
		return
	}
	player, ok := PlayersConnected[userId]
	if !ok {
		fmt.Println("uncorrect playerId:", userId)
		return
	}
	fmt.Println("user:", userId, " connect to table:", tableId)
	player.Send(ConnectJson)
}

func NewTable(table *Table) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	TablesPlayers[table.TableId] = *table
	Tables[table.TableId] = append(Tables[table.TableId], table.Admin)
	go UpdateTables()
}

func DeleteTable(tableId int64) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	wg := &sync.WaitGroup{}
	for _, playerId := range Tables[tableId] {
		wg.Add(1)
		go func(player Client) {
			defer wg.Done()
			player.Send([]byte("DiscconectTable"))
		}(PlayersConnected[playerId])
	}
	delete(Tables, tableId)
	delete(TablesPlayers, tableId)
	wg.Wait()
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

	NewPlayer(userId, conn)

	defer func() {
		fmt.Println("used:", userId, "unconnect")
		r.Body.Close()
		DeletePlayer(userId)
	}()

	for {
		_, event, err := conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}
		EventType := &Event{}
		json.Unmarshal(event, EventType)
		fmt.Printf("%#v\n", EventType)
		switch EventType.Type {
		case "NewTable":
			table := &Table{}
			json.Unmarshal(event, table)
			table.Admin = userId
			table.Players++
			go NewTable(table)
			fmt.Printf("%#v\n", table)
		case "TableConnect":
			go ConnectToTable(EventType.PlayerId, EventType.TableId)
		}
	}
}

func WaitersHandler(w http.ResponseWriter, r *http.Request) {
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

	fmt.Println("user:", userId, "connect to socket table:", tableId)

	defer func() {
		fmt.Println("user:", userId, "unconnect from table:", tableId)
		r.Body.Close()
	}()

	for {
		_, event, err := conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			return
		}
		EventType := &Event{}
		json.Unmarshal(event, EventType)
		fmt.Printf("%#v\n", EventType)
		switch EventType.Type {
		case "NewPlace":
		case "Kick":
		case "DeletePlace":
		case "Start":
		}
	}
}

func UpdateTables() {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	wg := &sync.WaitGroup{}
	sendTables, err := json.Marshal(TablesPlayers)
	if err != nil {
		panic(err)
	}
	for _, player := range PlayersConnected {
		wg.Add(1)
		go func() {
			defer wg.Done()
			player.Send(sendTables)
		}()
	}
	wg.Wait()
}
