import React from 'react';
import {View, Text, AsyncStorage, ScrollView, TouchableOpacity} from 'react-native';

import {styles} from './tablewaitstyle.js';

import database from '../../../firebase/firebase.js';
import server from '../../../../server.json';

let socket;

class TableWait extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userId:Number(this.props.userId),
			places:1,
			players:[]
		}
	}

	componentDidMount() {
		socket=new WebSocket("ws:"+server.adress+
			"/waiters"
			+"?userId="+this.state.userId+
			"&tableId="+this.props.tableId);

		socket.onmessage = event => {
			console.log("получены данные",event.data);
			let items=JSON.parse(event.data);
			if(items.type!==undefined){
				if(items.type==="Start"){
					this.props.router.stack[0].replace.Game({
						userId:this.state.userId,
						tableId:this.props.tableId,
						admin:this.props.admin,
						players:this.state.players
					});
				}
			} else {
				this.setState({
					players:{...items}
				});
			}
		}
	}

	componentWillUnmount() {
		socket.close();
	}

	KickPlayer = (userId, event) => {
		event.preventDefault();
		if(userId===-1){
			socket.send(JSON.stringify({
				type:"DeletePlace"
			}));
		} else {
			let Kick={
				type:"Kick",
				userId:userId
			};
			socket.send(JSON.stringify(Kick));
		}
	}

	AddPlace = () => {
		if(this.state.players.length === 10)
			return;
		socket.send(JSON.stringify({
			type:"AddPlace"
		}));
	}

	Start = () => {
		socket.send(JSON.stringify({
			type:"Start"
		}));	
	}

	render() {
		let players = this.state.players;
		return(
			<View style={styles.TableWait}>
				<View style={styles.Header}>
					<Text style={styles.TableText}>Table {this.props.tableNumber}</Text>
				</View>
				<View style={styles.Content}>
					<TouchableOpacity style={styles.AddPlace}
					onPress={this.AddPlace}>
						<Text style={styles.Text_AddPlace}>New Place</Text>
					</TouchableOpacity>
					<View style={styles.PlayerList}>
						<ScrollView>
						{Object.keys(players).map((index)=>{
							let key=players[index];
							if(key !== -1) {
								return <View key={index} style={styles.Player}>
									<Text style={styles.PlayerText}>User{key}</Text>
									{this.props.admin && this.state.userId !== key?
									<Text style={styles.Kick} 
									onPress={this.KickPlayer.bind(this,key)}>X</Text>
									:<Text></Text>}
								</View>
							} else {
								return <View key={index} style={styles.PlayerNone}>
									<Text style={styles.Kick} 
									onPress={this.KickPlayer.bind(this,key)}>X</Text>
								</View>
							}
						})}
						</ScrollView>
					</View>
					<TouchableOpacity style={styles.AddPlace}
					onPress={this.Start}>
						<Text style={styles.Text_AddPlace}>Start</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default TableWait;