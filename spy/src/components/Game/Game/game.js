import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native';

import {Game_Background,
Game_Footer_Height,
Game_Events_Width,
Game_Events_Height,
Game_Events_Background,
Game_Footer_Width,
Game_Footer_Turn_Width,
Game_Footer_Turn_Border_Background,
Game_Footer_Turn_BorderRadius,
Game_Footer_Turn_Background,
Game_Footer_Turn_BorderWidth,
Game_Events_BorderWidth,
Game_Events_BorderBackground,
Game_Events_BorderRadius} from '../../../styles/common.js';

class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			events:{}
		};
	}

	componentDidMount() {

	}

	handleInputChange = text => {
		console.log(text);
	}

	render() {
		return(
			<View style={styles.Game}>
				<View style={styles.Content}>
					<View style={styles.Events}>
						<TextInput style={styles.TextInput} 
						onChangeText={this.handleInputChange}/>
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

const styles=StyleSheet.create({
	Game:{
		backgroundColor: Game_Background,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	Events:{
		height: Game_Events_Height,
		width: Game_Events_Width,
		backgroundColor: Game_Events_Background,
		borderWidth: Game_Events_BorderWidth,
		borderColor: Game_Events_BorderBackground,
		borderStyle: 'solid',
		borderRadius: Game_Events_BorderRadius,
	},
	Content:{
		marginBottom: Game_Footer_Height,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	TextInput:{
		flex: 1,
	},
	Footer:{
		height: Game_Footer_Height,
		position: 'absolute',
		bottom: 0,
		left: 0,
		flexDirection: 'row',
		width:Game_Footer_Width
	},
	Turns:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		flex: 1,
	},
	Turn:{
		height:Game_Footer_Turn_Width,
		width:Game_Footer_Turn_Width,
		backgroundColor: Game_Footer_Turn_Background,
		width: Game_Footer_Turn_Width,
		height: Game_Footer_Turn_Width,
		borderWidth: Game_Footer_Turn_BorderWidth,
		borderColor: Game_Footer_Turn_Border_Background,
		borderStyle: 'solid',
		borderRadius: Game_Footer_Turn_BorderRadius,
	}
});