import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Input from '../../Pure/TextInput/textinput.js';
import EventBox from '../EventBox/eventbox.js';

import rules from './gamerules.json';

import {styles} from './gamestyle.js';

import database from '../../../firebase/firebase.js';

class Game extends React.Component {
	constructor(props) {
		super(props);

		let number=0;
		for(let i=0;i<this.props.players.length;++i){
			if(this.props.players[i]==this.props.userId){
				number=i;
				break;
			}
		}

		this.state = {
			events:{},
			currentmessage:'',
			roles:[],
			number:number
		};
	}

	componentDidMount() {
		let gametable=database().ref('game/'+this.props.tableId);

		if(this.props.admin) {
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

			gametable.push({
				type:'roles',
				roles:roles
			});
		}

		gametable.on('value', snapshot => {
			let items=snapshot.val();

			if(items){
				let events={};
				let roles=[];

				Object.keys(items).sort().forEach((key)=>{
					let item=items[key];
					if(item.type==='message'){
						events={...events,...{key:item}};
					} else if(item.type==='roles') {
						roles=item.roles;
					}
				});

				this.setState({
					roles:roles,
					events:events
				});
			}
		});
	}

	getRole(){
		return this.state.roles[this.state.number];
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
		return(
			<View style={styles.Game}>
				<View style={styles.Header}>
					<Text style={styles.Header_Text}>
					Table{this.props.tableId}</Text>
				</View>
				<View style={styles.Info}>
					<View style={this.getRole()?styles.Player:styles.PlayerSpy}>
					</View>
					<View style={styles.Players}>
						{Object.keys(this.props.players).map((key,index)=>{
							return(
								<Text key={index}>
								{index+1}.{this.props.players[key]}
								</Text>
							);	
						})}
					</View>
				</View>
				<View style={styles.Turns}>
					<TouchableOpacity style={styles.Turn}>
						<Text style={styles.Turn_Text}>I</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.Turn}>
						<Text style={styles.Turn_Text}>II</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.Turn}>
						<Text style={styles.Turn_Text}>III</Text>
					</TouchableOpacity>
					<TouchableOpacity style ={styles.Turn}>
						<Text style={styles.Turn_Text}>IV</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.Turn}>
						<Text style={styles.Turn_Text}>V</Text>
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