import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Input from '../../Pure/TextInput/textinput.js';

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

		gametable.on('value', snapshot => {
			let items=snapshot.val();
			console.log(items);

			this.setState({
				events:items
			});
		});
	}

	handleSubmit = (event,any) => {
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
				<View style={styles.Content}>
					<View style={styles.Events}>
						<ScrollView>
							{this.state.events && 
								Object.keys(this.state.events).map((key,index)=>{
									return(
										<Text key={index}>
										{this.state.events[key].message}
										</Text>
									);
							})}
						</ScrollView>
						<Input placeholder='Введите сообщение'
						onChangeText={this.handleInputChange}
						value={this.state.currentmessage}
						onSubmitEditing={this.handleSubmit}
						/>
					</View>
				</View>
				<View style={styles.Footer}>
					<View style={styles.Turns}>
						<TouchableOpacity style={styles.Turn}>
						</TouchableOpacity>
						<TouchableOpacity style={styles.Turn}>
						</TouchableOpacity>
						<TouchableOpacity style={styles.Turn}>
						</TouchableOpacity>
						<TouchableOpacity style={styles.Turn}>
						</TouchableOpacity>
						<TouchableOpacity style={styles.Turn}>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

export default Game;