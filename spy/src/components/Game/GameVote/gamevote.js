import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';

import {styles} from './gamevotestyle.js';

class GameVote extends React.Component {
	constructor() {
		super();
	}

	handleSubmitReject = () => {
		this.props.handleSubmit('reject',this.props.turn,this.props.team);
	}

	handleSubmitAccept = () => {
		this.props.handleSubmit('accept',this.props.turn,this.props.team);
	}

	render() {
		return(
			<View style={styles.GameVote}>
				<View style={styles.Header}>
					<Text style={styles.Header_Text}>Vote</Text>
				</View>
				<View style={styles.Info}>
					<View style={styles.Players}>
						<View style={styles.PlayersTitle}>
							<Text style={styles.PlayersTitleText}>
								Выбранная команда
							</Text>
						</View>
						{Object.keys(this.props.players).map((key,index)=>{
							if(this.props.chosen[index])
								return(
									<View style={styles.PlayerRow} key={index}>
										<Text style={styles.PlayerText}>
											{index}.{this.props.players[key]}
										</Text>
									</View>
								);
							else
								return(<View key={index}></View>)
						})}
					</View>
				</View>
				<View style={styles.Vote}>
					<TouchableOpacity style={styles.Reject}
					onPress={this.handleSubmitReject}>
					</TouchableOpacity>
					<TouchableOpacity style={styles.Accept}
					onPress={this.handleSubmitAccept}>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default GameVote;