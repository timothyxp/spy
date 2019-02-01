import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import rules from '../Game/gamerules.json';

import {Game_Header_TurnSize,
	Game_Header_TurnBorderWidth,
	Game_Header_TurnsWidth,
	Game_Header_TurnBorderRedius} from '../../../styles/common.js';

class StateBox extends React.Component {
	constructor() {
		super();
	}

	getMainText() {
		let state=this.props.state;
		if(state.gameState==='choose'){//выбор
			let players=rules[this.props.players.length][state.turn];
			let playersName=players===1?'игрока':'игроков';
			if(this.props.players[state.picker]===state.userId){
				return "Вы лидер! Выбирайте "+players+" "+playersName;
			} else {
				return "Лидер выбирает "+players+" "+playersName;
			}
		} else if(state.gameState==='missionWait' 
			|| state.gameState==='voteMission'){//Ожидание миссии
			return "Команда на миссии";
		} else if(state.gameState==='chooseWait' 
		|| state.gameState==='voteTeam'){//Ожидание голосования
			return "Ждем пока другие игроки проголосуют";
		} else {
			return state.gameState;
		}
	}

	render() {  
		let turns=[1,2,3,4,5];

		return(
			<View style={styles.StateBox}>
				<Text style={styles.MainStateText}>
					{this.getMainText()}
				</Text>
				<View style={styles.TurnsResult}>
					{turns.map((key)=>{
						if(this.props.state.results[key]){
							if(this.props.state.results[key]==='accept'){
								return(
									<View key={key} style={styles.TurnResultRes}>
									</View>
								);
							} else {
								return(
									<View key={key} style={styles.TurnResultSpy}>
									</View>
								);
							}
						} else {
							return(
								<View key={key} style={styles.TurnResultNone}>
								</View>
							);
						}
					})}
				</View>
			</View>
		);
	}
};

export default StateBox;

const styles=StyleSheet.create({
	StateBox:{
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	MainStateText:{
		color:'black',
		fontSize: 22,
		fontWeight: '300',
	},
	TurnsResult:{
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		width: Game_Header_TurnsWidth,
		height: Game_Header_TurnSize,
	},
	TurnResultNone:{
		height: Game_Header_TurnSize,
		width: Game_Header_TurnSize,
		borderWidth: Game_Header_TurnBorderWidth,
		borderColor: 'black',
		borderStyle: 'solid',
		borderRadius: Game_Header_TurnBorderRedius,
	},
	TurnResultRes:{
		height: Game_Header_TurnSize,
		width: Game_Header_TurnSize,
		borderWidth: Game_Header_TurnBorderWidth,
		borderColor: 'black',
		borderStyle: 'solid',
		borderRadius: Game_Header_TurnBorderRedius,
		backgroundColor: 'blue',
	},
	TurnResultSpy:{
		height: Game_Header_TurnSize,
		width: Game_Header_TurnSize,
		borderWidth: Game_Header_TurnBorderWidth,
		borderColor: 'black',
		borderStyle: 'solid',
		borderRadius: Game_Header_TurnBorderRedius,
		backgroundColor: 'red',
	}
});