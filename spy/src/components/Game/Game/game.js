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
		let chosen=[];
		for(let i=0;i<this.props.players.length;++i){
			if(this.props.players[i]==this.props.userId){
				number=i;
			}
			chosen.push(false);
		}

		this.state = {
			events:{},
			currentmessage:'',
			roles:[],
			number:number,
			turn:1,
			team:1,
			picker:0,
			chosen:[],
			gameState:'choose',
			chosenTeam:[]
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
				let gameState=this.state.gameState;
				let turn=this.state.turn;
				let team=this.state.team;
				let chosenTeam=this.state.chosenTeam;

				Object.keys(items).sort().forEach((key)=>{
					let item=items[key];
					if(item.type==='message'){
						events={...events,...{[key]:item}};
					} else if(item.type==='roles') {
						roles=item.roles;
					} else if(item.type==='acceptTeam') {
						if(item.turn>=turn || 
						(item.turn===turn && item.team>team)){
							gameState='voteTeam';
							turn=item.turn;
							team=item.team;
							chosenTeam=item.chosen;
						}
					}
				});

				this.setState({
					roles:roles,
					events:events,
					turn:turn,
					team:team,
					gameState:gameState,
					chosenTeam:chosenTeam
				});
			}
		});
	}

	componentWillUnmount() {
		let wait=database().ref('wait/'+this.props.tableId);
		let gametable=database().ref('game/'+this.props.tableId);

		this.props.admin && wait.remove();
		this.props.admin && gametable.off();
	}

	getRole() {
		return this.state.roles[this.state.number];
	}

	getId() {
		return this.props.players[this.state.number];
	}

	handleSubmitMessage = (event, any) => {
		let gametable=database().ref('game/'+this.props.tableId);

		if(this.state.currentmessage.length!==0){
			gametable.push({
				type:'message',
				message:this.state.currentmessage,
				turn:this.state.turn
			});
	
			this.setState({
				currentmessage:''
			});
		}
	}

	handleInputChange = text => {
		this.setState({
			currentmessage:text
		});
	}

	ChoosePlayer = (index) => {
		if(this.state.number===this.state.picker){
			let chosen=this.state.chosen;
			chosen[index]=!chosen[index];

			this.setState({
				chosen:chosen
			});
		}
	}

	AcceptTeam = () => {
		let gametable=database().ref('game/'+this.props.tableId);

		gametable.push({
			type:'acceptTeam',
			chosen:this.state.chosen,
			turn:this.state.turn,
			team:this.state.team
		});
	}

	render() {
		return(
			<View style={styles.Game}>
				<View style={styles.Header}>
					<Text style={styles.Header_Text}>
					{this.state.gameState}</Text>
				</View>
				<View style={styles.Info}>
					<View style={styles.LeftInfo}>
						<View style={this.getRole()?styles.Player:styles.PlayerSpy}>
						</View>
						{this.state.number===this.state.picker ?
						<TouchableOpacity style={styles.AcceptTeam}
						onPress={this.AcceptTeam}>
							<Text style={styles.AcceptTeamText}>
								Принять</Text>
						</TouchableOpacity>
						:<View></View>
						}
					</View>
					<View style={styles.Players}>
						{Object.keys(this.props.players).map((key,index)=>{
							return(
								<TouchableOpacity key={index} 
								style={this.state.chosen[index] 
									? styles.PLayerRowChosen
									:styles.PLayerRow}
								onPress={this.ChoosePlayer.bind(this,index)}>
									<Text>
									{index+1}.{this.props.players[key]}
									</Text>
								</TouchableOpacity>
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