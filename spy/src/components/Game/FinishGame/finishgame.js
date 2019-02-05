import React from 'react';
import {Text, View,StyleSheet,TouchableOpacity} from 'react-native';
import PlayersList from '../PlayersList/playerslist.js';
import EventBox from '../EventBox/eventbox.js';
import Input from '../../Pure/TextInput/textinput.js';

import {styles} from './finishgamestyle.js';

import database from '../../../firebase/firebase.js';

class FinishGame extends React.Component {
	constructor() {
		super();
		this.state={
			currentmessage:'',
			events:[]
		}
	}

	componentDidMount() {
		let finishgame=database().ref('finishgame/'+this.props.tableId);

		finishgame.on('value',snapshot=>{
			let items=snapshot.val();
			let events=[];

			if(items){
				Object.keys(items).sort().forEach((key)=>{
					let item=items[key];
					if(item.type==='message'){
						events.push({...item,...{key:key}});
					}
				});
				console.log(events);
	
				this.setState({
					events:events
				});
			}
		});
	}

	handleInputChange = text => {
		this.setState({
			currentmessage:text
		});
	}

	handleSubmitMessage = event => {
		if(this.state.currentmessage==='')
			return;
		let finishgame=database().ref('finishgame/'+this.props.tableId);

		finishgame.push({
			type:'message',
			message:this.state.currentmessage,
			player:this.props.number
		});
		this.setState({
			currentmessage:''
		});
	}

	render() {
		return(
			<View style={this.props.spyWins===3 ? styles.FinishGameSpy
				:styles.FinishGameResistance}>
				<PlayersList players={this.props.players}
				type='finishgame'
				roles={this.props.roles}/>
				<View style={styles.MessageBox}>
					<EventBox events={this.state.events}/>
					<Input placeholder='Введите сообщение'
					onChangeText={this.handleInputChange}
					value={this.state.currentmessage}
					onSubmitEditing={this.handleSubmitMessage}
					/>
				</View>
				<TouchableOpacity style={styles.Button}
				onPress={()=>this.props.router.stack[0].replace.MainMenu({})}>
					<Text style={styles.Button_Text}>Menu</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default FinishGame;