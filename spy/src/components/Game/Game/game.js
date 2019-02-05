import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Input from '../../Pure/TextInput/textinput.js';
import EventBox from '../EventBox/eventbox.js';
import StateBox from '../StateBox/statebox.js';
import PlayersList from '../PlayersList/playerslist.js';

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
			events:[],
			eventshappend:[],
			currentmessage:'',
			roles:[],
			number:number,
			turn:1,
			team:0,
			picker:0,
			chosen:[],
			chosenNumber:0,
			gameState:'choose',
			chosenTeam:[],
			spyWins:0,
			resWins:0,
			userId:this.props.userId,
			results:[]
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
				let events=this.state.events;
				let Messages=new Set();
				this.state.events.map((key)=>{
					if(key.type==='message')
						Messages.add(key.key);
				});
				let eventshappend=this.state.eventshappend;
				let roles=[];
				let gameState=this.state.gameState;
				let lastState=this.state.gameState;
				let turn =this.state.turn;
				let team=this.state.team;
				let chosenTeam=this.state.chosenTeam;
				let votes=[];
				let votesNumber=0;
				let playersNumber=this.props.players.length;
				let picker=this.state.picker;
				let missionVotes=[];
				let missionVotesNumber=0;
				let spyWins=this.state.spyWins;
				let resWins=this.state.resWins;
				let results=this.state.results;

				Object.keys(items).sort().forEach((key)=>{
					let item=items[key];
					if(item.type==='message'){
						if(!Messages.has(key)){
							events.push({...item,...{key:key}});
						}
					} else if(item.type==='roles') {
						roles=item.roles;
					} else if(item.type==='acceptTeam') {
						if(!eventshappend[item.turn])
							eventshappend[item.turn]=[];
						if(!eventshappend[item.turn][item.team]){
							events.push(item);
							eventshappend[item.turn][item.team]='acceptTeam';
						}
						if(item.turn>turn || 
						(item.turn===turn && item.team>team)){
							Missionvotes=[];
							votes=[];
							votesNumber=0;
							missionVotesNumber=0;
							gameState='voteTeam';
							turn=item.turn;
							team=item.team;
							chosenTeam=item.chosen;
						}
					} else if(item.type==='voteTeam') {
						if(item.turn===turn && item.team=== team){
							let num = item.number;
							if(!votes[num]){
								votes[num]=item.result;
								votesNumber++;
							}
							if(votesNumber===playersNumber){
								let accept=0;
								let reject=0;
								for(let i=0;i<playersNumber;i++){
									if(votes[i]==='accept')
										accept++;
									else
										reject++;
								}
								if(accept>=reject){
									gameState='voteMission';
									if(eventshappend[item.turn][item.team]
										==='acceptTeam'){
										eventshappend[item.turn][item.team]='choose';
										events.push({
											type:'choose',
											result:'accept'
										});
									}
								} else {
									gameState='choose';
									if(eventshappend[item.turn][item.team]
										==='acceptTeam'){
										eventshappend[item.turn][item.team]='choose';
										events.push({
											type:'choose',
											result:'reject'
										});
									}
									picker=(picker+1)%playersNumber;
								}
							}
						}
					} else if(item.type==='voteMission') {
						if(item.turn===turn && item.team===team){
							let num=item.number;
							gameState='misiionWait';
							if(!missionVotes[num]){
								missionVotes[num]=item.result;
								missionVotesNumber++;
							}
							let spy=rules[playersNumber][turn];
							if(missionVotesNumber===spy){
								let accept=0;
								let reject=0;
								for(let i=0;i<playersNumber;i++){
									if(chosenTeam[i]){
										if(missionVotes[i]==='accept')
											accept++;
										else
											reject++;
									}	
								}
								if(reject>=1){
									results[turn]='reject';
									gameState='choose';
									spyWins++;
									turn++;
									team=0;
									if(eventshappend[item.turn][item.team]==='choose'){
										eventshappend[item.turn][item.team]='misiion';
										events.push({
											type:'mission',
											result:'reject'
										});
									}
								} else {
									results[turn]='accept';
									gameState='choose';
									turn++;
									resWins++;
									team=0;
									if(eventshappend[item.turn][item.team]==='choose'){
										eventshappend[item.turn][item.team]='misiion';
										events.push({
											type:'mission',
											result:'accept'
										});
									}
									picker=(picker+1)%playersNumber;
								}
							}
						}
					}
				});

				if(spyWins === 3 || resWins === 3){
					setTimeout(() => {
						this.props.router.stack[0].replace.FinishGame({
							roles:roles,
							tableId:this.props.tableId,
							spyWins:spyWins,
							resWins:resWins,
							players:this.props.players,
							roles:this.state.roles,
							number:this.state.number
						});
					}	
					,1000);
				}

				console.log(turn,team,gameState);
				
				if(gameState==='voteTeam') {
					this.props.router.push.GameVote({
						type:'Team',
						handleSubmit:this.VoteTeam,
						players:this.props.players,
						chosen:chosenTeam,
						turn:turn,
						team:team
					},
					{
						type:'none'
					});
					gameState='chooseWait';
				}

				if(gameState==='voteMission') {
					setTimeout(()=> {
						chosenTeam[this.state.number] && 
						this.props.router.push.GameVote({
							type:'Mission',
							handleSubmit:this.VoteMission,
							players:this.props.players,
							chosen:chosenTeam,
							turn:turn,
							team:team
						},{
							type:'none'
						});
						}
					,1000);
					gameState='misiionWait';
				}

				this.setState({
					roles:roles,
					events:events,
					turn:turn,
					team:team,
					gameState:gameState,
					chosenTeam:chosenTeam,
					picker:picker,
					spyWins:spyWins,
					resWins:resWins,
					results:results,
					eventshappend:eventshappend
				});
			}
		});
	}

	VoteTeam = (result,turn,team) => {

		this.props.router.pop()


		let gametable=database().ref('game/'+this.props.tableId);

		gametable.push({
			type:'voteTeam',
			number:this.state.number,
			turn:turn,
			team:team,
			result:result
		});

		this.setState({
			gameState:'chooseWait'
		});
	}

	VoteMission = (result,turn,team) => {
		this.props.router.pop()

		let gametable=database().ref('game/'+this.props.tableId);

		gametable.push({
			type:'voteMission',
			number:this.state.number,
			turn:turn,
			team:team,
			result:result
		});

		this.setState({
			gameState:'misiionWait'
		});
	}

	componentWillUnmount() {
		let wait=database().ref('wait/'+this.props.tableId);
		let gametable=database().ref('game/'+this.props.tableId);

		wait.off();
		this.props.admin && wait.remove();
		gametable.off();
		this.props.admin && gametable.remove();
	}

	getRole() {
		return this.state.roles[this.state.number];
	}

	getId() {
		return this.props.players[this.state.number];
	}

	handleSubmitMessage = (event) => {
		let gametable=database().ref('game/'+this.props.tableId);

		if(this.state.currentmessage.length!==0){
			gametable.push({
				type:'message',
				message:this.state.currentmessage,
				turn:this.state.turn,
				player:this.state.number
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
		if(this.state.number===this.state.picker 
			&& this.state.gameState==='choose'){
			let chosen=this.state.chosen;
			let chosenNumber=this.state.chosenNumber;

			chosen[index]=!chosen[index];
			if(chosen[index])
				chosenNumber++;
			else
				chosenNumber--;


			this.setState({
				chosen:chosen,
				chosenNumber:chosenNumber
			});
		}
	}

	EnoughPlayers = () => {
		return this.state.chosenNumber === 
		rules[this.props.players.length][this.state.turn];
	}

	AcceptTeam = () => {
		let playersNumber=this.props.players.length;
		if(rules[playersNumber][this.state.turn] !== this.state.chosenNumber)
			return;
		
		let gametable=database().ref('game/'+this.props.tableId);

		gametable.push({
			type:'acceptTeam',
			chosen:this.state.chosen,
			turn:this.state.turn,
			team:this.state.team+1
		});

		let chosen =this.state.chosen;
		for(let i=0;i<chosen.length;i++){
			chosen[i]=false;
		}
		this.setState({
			chosen:chosen,
			chosenNumber:0
		});
	}
	
	render() {
		return(
			<View style={styles.Game}>
				<View style={styles.Header}>
					<StateBox state={this.state}
					players={this.props.players}/>
				</View>
				<View style={styles.Info}>
					<View style={styles.LeftInfo}>
						<View style={this.getRole()?styles.Player:styles.PlayerSpy}>
						</View>
						{this.state.number===this.state.picker && 
						this.state.gameState==='choose' ?
						<TouchableOpacity style= {this.EnoughPlayers() 
							? styles.AcceptTeamActive:
							styles.AcceptTeamUnActive}
						onPress={this.AcceptTeam}>
							<Text style={styles.AcceptTeamText}>
								Принять</Text>
						</TouchableOpacity>
						:<View></View>
						}
					</View>
					<PlayersList players={this.props.players}
					chosen={this.state.chosen}
					ChoosePlayer={this.ChoosePlayer}
					type='game'/>
				</View>
				{
				/*<View style={styles.Turns}>
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
				</View>*/
				}
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