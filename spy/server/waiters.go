package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
	"strconv"
	"sync"
)

func UpdateTable(tableId int64) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	fmt.Println("Start Update Table:", tableId)
	SendTable, _ := json.Marshal(Tables[tableId])
	wg := &sync.WaitGroup{}
	for _, player := range Waiters[tableId] {
		wg.Add(1)
		go func(player Client) {
			defer wg.Done()
			player.Send(SendTable)
		}(player)
	}
	wg.Wait()
}

func NewPlayerTable(userId int64, tableId int64, conn *websocket.Conn) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	player := Client{
		conn:   conn,
		userId: userId,
		table:  tableId,
	}
	length := len(Waiters[tableId])
	Tables[tableId][length] = userId
	Waiters[tableId] = append(Waiters[tableId], player)
	go UpdateTable(tableId)
}

func DeletePlayerFromTable(userId int64, tableId int64) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	for index, player := range Tables[tableId] {
		if player == userId {
			length := len(Waiters[tableId])
			if length <= 1 {
				go DeleteTable(tableId)
				return
			}
			Waiters[tableId][index] = Waiters[tableId][length-1]
			Waiters[tableId] = Waiters[tableId][:length-1]
			length = len(Tables[tableId])
			Tables[tableId][index] = Tables[tableId][length-1]
			Tables[tableId] = Tables[tableId][:length-1]
			fmt.Println("user:", userId, "delete from table:", tableId)
			break
		}
	}
	go UpdateTable(tableId)
	go UpdateTables()
}

func AddPlace(userId int64, tableId int64) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	table, ok := TablesPlayers[tableId]
	if !ok {
		fmt.Println("No table:", tableId)
		return
	}
	if table.Admin != userId {
		return
	}
	if table.Size == MaxPlayers {
		return
	}
	table.Size++
	TablesPlayers[tableId] = table
	Tables[tableId] = append(Tables[tableId], int64(-1))
	go UpdateTable(tableId)
	go UpdateTables()
}

func DeletePlace(userId int64, tableId int64) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	table, ok := TablesPlayers[tableId]
	if !ok {
		fmt.Println("No table:", tableId)
		return
	}
	if table.Admin != userId {
		return
	}
	if table.Size == table.Players {
		return
	}
	table.Size--
	TablesPlayers[tableId] = table
	Tables[tableId] = Tables[tableId][:len(Tables[tableId])-1]
	go UpdateTable(tableId)
	go UpdateTables()
}

func KickPlayer(userId int64, tableId int64, kickUserId int64) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	table, ok := TablesPlayers[tableId]
	if !ok {
		fmt.Println("No table:", tableId)
		return
	}
	if table.Admin != userId {
		return
	}
	if userId == kickUserId {
		return
	}
	go DeletePlayerFromTable(kickUserId, tableId)
}

func Start(userId int64, tableId int64) {
	MapMutex.Lock()
	defer MapMutex.Unlock()
	table, ok := TablesPlayers[tableId]
	if !ok {
		fmt.Println("No table:", tableId)
		return
	}
	if table.Admin != userId {
		return
	}
	if table.Size != table.Players {
		return
	}
	StartEvent := Event{
		Type: "Start",
	}
	EventJson, _ := json.Marshal(StartEvent)
	wg := &sync.WaitGroup{}
	fmt.Println("table:", tableId, "start")
	for _, player := range Waiters[tableId] {
		wg.Add(1)
		go func(player Client) {
			defer wg.Done()
			player.Send(EventJson)
		}(player)
	}
	wg.Wait()
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

	NewPlayerTable(userId, tableId, conn)
	fmt.Println("user:", userId, "connect to socket table:", tableId)

	defer func() {
		fmt.Println("user:", userId, "unconnect from table:", tableId)
		r.Body.Close()
		go DeletePlayerFromTable(userId, tableId)
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
		case "AddPlace":
			go AddPlace(userId, tableId)
		case "Kick":
			go KickPlayer(userId, tableId, EventType.PlayerId)
		case "DeletePlace":
			go DeletePlace(userId, tableId)
		case "Start":
			go Start(userId, tableId)
		}
	}
}
