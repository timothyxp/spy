import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Input from '../../Pure/TextInput/textinput.js';
import EventBox from '../EventBox/eventbox.js';

import rules from './gamerules.json';

import {styles} from './gamestyle.js';

import database from '../../../firebase/firebase.js';

class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			events:{},
			currentmessage:''
		};
	}

	componentDidMount() {
		let gametable=database().ref('game/'+this.props.tableId);

		/*if(this.props.admin) {
			let players = this.props.players.length;
			let roles = [];
			let spy=rules[players].spy;

			for(let i=0;i<spy;++i)
				roles.push(0);

			for(let i=0;i<players-spy;++i)
				roles.push(1);

			for(let i=0;i<roles.length;++i){
				let ind=Math.floor(Math.random()*(i+1));
				let copy=roles[ind];
				roles[ind]=roles[i];
				roles[i]=copy;
			}

		}*/

		gametable.on('value', snapshot => {
			let items=snapshot.val();
			console.log(items);

			this.setState({
				events:items
			});
		});
	}

	handleSubmitMessage = (event, any) => {
		let gametable=database().ref('game/'+this.props.tableId);

		gametable.push({
			type:'message',
			message:this.state.currentmessage
		});

		this.setState({
			currentmessage:''
		});
	}

	handleInputChange = text => {
		this.setState({
			currentmessage:text
		});
	}

	render() {
		console.log(this.props.players);
		return(
			<View style={styles.Game}>
				<View style={styles.Header}>
					<Text></Text>
				</View>
				<View style={styles.Info}>
					<View style={styles.Player}>

					</View>
					<View style={styles.Players}>

					</View>
				</View>
				<View style={styles.Turns}>
					<TouchableOpacity style={styles.Turn}>
					</TouchableOpacity>
					<TouchableOpacity style={styles.Turn}>
					</TouchableOpacity>
					<TouchableOpacity style={styles.Turn}>
					</TouchableOpacity>
					<TouchableOpacity style ={styles.Turn}>
					</TouchableOpacity>
					<TouchableOpacity style={styles.Turn}>
					</TouchableOpacity>
				</View>
				<View style={styles.Events}>
					<EventBox events={this.state.events}/>
					<Input placeholder='Введите сообщение'
					onChangeText={this.handleInputChange}
					value={this.state.currentmessage}
					onSubmitEditing={this.handleSubmitMessage}
					/>
				</View>
			</View>
		);
	}
}

export default Game;