import React from 'react';
import {View, Text, StyleSheet, AsyncStorage, ScrollView} from 'react-native';

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
Game_Content_Background,
Game_Content_Border_Color,
Game_Content_Border_Width,
Game_Content_Border_Radius,
Game_Button_Background} from '../../../styles/common.js'; 

import database from '../../../firebase/firebase.js';

class TableWait extends React.Component {
	constructor() {
		super();
		this.state = {
			userId:'none',
			events:{}
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

			this.setState({
				events:{...items,...this.state.events}
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

	update() {
		let players = new Set();
		Object.keys(this.state.events).forEach((key) => {
			let item=this.state.events[key];
			if(item.type === 'new') {
				players.add(item.userId);
			} else {
				players.delete(item.userId);
			}
		});
		
		return Array.from(players)

	}

	render() {
		let players = this.update();
		return(
			<View style={styles.TableWait}>
				<View style={styles.Header}>
					<Text style={styles.TableText}>Table {this.props.tableNumber}</Text>
				</View>
				<View style={styles.Content}>
					<View style={styles.PlayerList}>
							{players.map((key,index)=>{
								return <View key={index} style={styles.Player}>
									<Text style={styles.PlayerText}>User+{key}</Text>
								</View>
							})}
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
	Player:{
		width:Menu_Button_Width,
		height:Menu_Button_Heigth,
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
	}
})