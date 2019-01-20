import React from 'react';
import {View, Text, StyleSheet, AsyncStorage, ScrollView, TouchableOpacity} from 'react-native';

import {Menu_Background,
Menu_Button_Unusual_Color,
Menu_Button_Border_Unusual_Color,
Menu_Button_Border_Width,
Menu_Button_Width,
Menu_Button_Heigth,
Menu_Button_Border_Usual_Color,
Menu_Text_Unusual_Color,
Menu_Text_Size,
GameWait_Header_Height,
GameWait_PlayersList_Width,
GameWait_PlayersList_Heigth,
GameWait_PlayersList_Kick_Color,
GameWait_PlayersList_Kick_FontSize,
Game_Content_Background,
Game_Content_Border_Color,
Game_Content_Border_Width,
Game_Content_Border_Radius,
Game_Button_Background,
Game_AddTable_Width,
Game_AddTable_Height,
Menu_Button_Border_Radius} from '../../../styles/common.js'; 

import database from '../../../firebase/firebase.js';

class TableWait extends React.Component {
	constructor() {
		super();
		this.state = {
			userId:'none',
			places:5,
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
		let wait=database().ref('wait/'+this.props.tableId);
		wait.on('value', snapshot => {
			let items = snapshot.val();

			let places = 5;
			let players = new Set();
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
					}
				});
			}
			if(!players.has(this.state.userId)){
				this.props.router.pop();
			}

			let playersAll=Array.from(players);
			for(let i=1; i <= places-players.size; i++) {
				playersAll.push(-1);
			}
			console.log(playersAll);
			this.setState({
				places:places,
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

	KickPlayer = (userId, event) => {
		event.preventDefault();
		let wait=database().ref('wait/'+this.props.tableId);
		wait.push({
			type:'leave',
			userId:userId
		});
	}

	AddPlace = () => {
		if(this.state.places===10)
			return;
		let wait=database().ref('wait/'+this.props.tableId);
		wait.push({
			type:'newPlace'
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
						<Text onPress={()=>database().ref('wait/'+this.props.tableId).push({
						type:'new',
						userId:Math.floor(Math.random()*1e9)
						})}>NEw kekes</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default TableWait;

const styles=StyleSheet.create({
	TableWait:{
		backgroundColor: Menu_Background,
		flex: 1,
		flexDirection: 'column'
	},
	Header:{
		backgroundColor: Menu_Button_Unusual_Color,
		borderBottomWidth: Menu_Button_Border_Width,
		borderBottomColor: Menu_Button_Border_Unusual_Color,
		borderStyle: 'solid',
		justifyContent: 'center',
		alignItems: 'center',
		height: GameWait_Header_Height
	},
	TableText:{
		color: Menu_Text_Unusual_Color,
		fontSize: Menu_Text_Size
	},
	Content:{
		marginTop: GameWait_Header_Height,
		justifyContent: 'center',
		alignItems: 'center'
	},
	PlayerList:{
		backgroundColor: Game_Content_Background,
		borderWidth: Game_Content_Border_Width,
		borderColor: Game_Content_Border_Color,
		borderStyle: 'solid',
		width: GameWait_PlayersList_Width,
		height: GameWait_PlayersList_Heigth,
		borderRadius:Game_Content_Border_Radius,
		alignItems: 'center',
		flexDirection: 'column'
	},
	AddPlace:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'green',
		width:Game_AddTable_Width,
		height:Game_AddTable_Height,
		marginBottom:20,
		borderStyle:'solid',
		borderWidth:Menu_Button_Border_Width,
		borderColor:'yellow',
		borderRadius:Menu_Button_Border_Radius
	},
	Text_AddPlace:{
		color:'black',
		fontSize: Menu_Text_Size
	},
	Player:{
		width:Menu_Button_Width,
		height:Menu_Button_Heigth,
		flexDirection: 'row',
		alignItems:'center',
		backgroundColor:Game_Button_Background,
		justifyContent:'center',
		borderStyle:'solid',
		borderWidth:Menu_Button_Border_Width,
		borderColor:Menu_Button_Border_Usual_Color
	},
	PlayerText:{
		color: Menu_Text_Unusual_Color,
		fontSize: Menu_Text_Size
	},
	PlayerNone:{
		width:Menu_Button_Width,
		height:Menu_Button_Heigth,
		flexDirection: 'row',
		alignItems:'center',
		backgroundColor:'green',
		justifyContent:'center',
		borderStyle:'solid',
		borderWidth:Menu_Button_Border_Width,
		borderColor:Menu_Button_Border_Usual_Color
	},
	Kick:{
		color:GameWait_PlayersList_Kick_Color,
		fontSize: GameWait_PlayersList_Kick_FontSize
	}
})