import React from 'react';
import {View, Text, AsyncStorage, ScrollView, TouchableOpacity} from 'react-native';

import {styles} from './tablewaitstyle.js';

import database from '../../../firebase/firebase.js';

class TableWait extends React.Component {
	constructor() {
		super();
		this.state = {
			userId:'none',
			places:2,
			players:[]
		}
	}

	 async GetId() {
    	try {
    	  const value = await AsyncStorage.getItem('@spy:id');
    	  return value;
    	} catch(error) {
    	  console.log('Cant get ID:' + error);
		}
  	}

	componentDidMount() {
		this._isMounted = true;
		let wait=database().ref('wait/'+this.props.tableId);
		wait.on('value', snapshot => {
			let items = snapshot.val();

			let places = 2;
			let players = new Set();
			let start=false;

			if(items) {
				Object.keys(items).sort().forEach((key) => {
					let item=items[key];
					if(item.type === 'new') {
						players.add(item.userId);
					} else if(item.type === 'leave') {
						players.delete(item.userId);
					} else if(item.type === 'newPlace') {
						places++;
					} else if(item.type === 'erasePlace'){
						places--;
					} else if(item.type === 'start'){
						this.Start();
						start=true;
					}
				});
			}
			if(!start && !players.has(this.state.userId)){
				this.props.router.pop();
			}

			let playersAll=Array.from(players);
			let pl=playersAll.length;

			this.props.admin && this.props.tableRef.set({
				tableId:this.props.tableId,
				size:places,
				players:playersAll.length
			});

			for(let i=1; i <= places-players.size; i++) {
				playersAll.push(-1);
			}
			
			this.setState({
				places:pl,
				players:playersAll
			});
		});

		this.GetId()
		.then(value => {
			this.setState({
				userId:value
			});
			return value;
		}).then(value => {
			wait.push({
				type:'new',
				userId:this.state.userId
			});
		});
	}

	componentWillUnmount() {
		let wait = database().ref('wait/'+this.props.tableId);

		wait.off();

		if(this.state.places === 1 || this.props.admin){
			//wait.remove();
			this.props.tableRef.remove();
		} else {
			wait.push({
				type:'leave',
				userId:this.state.userId
			});
		}
	}

	KickPlayer = (userId, event) => {
		event.preventDefault();
		let wait=database().ref('wait/'+this.props.tableId);
		wait.push({
			type:'leave',
			userId:userId
		});
	}

	AddPlace = () => {
		if(this.state.players.length === 10)
			return;
		let wait=database().ref('wait/'+this.props.tableId);
		wait.push({
			type:'newPlace'
		});
	}

	Start = () => {
		let wait=database().ref('wait/'+this.props.tableId);

		wait.off();
		this.props.admin && wait.push({
			type:'start'
		});
		this.props.admin && this.props.tableRef.remove();

		this.props.router.stack[1].replace.Game({
			userId:this.state.userId,
			tableId:this.props.tableId,
			admin:this.props.admin,
			players:this.state.players
		});
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
						{players.map((key,index)=>{
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
								</View>
							}
						})}
						<Text onPress={
						/*()=>database().ref('wait/'+this.props.tableId).remove()*/
						()=>database().ref('wait/'+this.props.tableId).push({
						type:'new',
						userId:Math.floor(Math.random()*1e9)
						})}>Test Button</Text>
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