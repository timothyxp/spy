import React from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';

import {Game_Players_Width,
Game_Players_Height,
Game_Players_BorderWidth,
Game_Players_BorderColor,
Game_Players_ChosenColor,
Game_PlayerRow_MarginTop,
Game_PlayerRow_Width,
Game_PlayerRow_BorderColor,
Game_PlayerRow_Height,
Game_Players_BorderRadius} from '../../../styles/common.js';

class PlayersList extends React.Component {
	constructor() {
		super();
	}

	styleForPlayer = index => {
		if(this.props.type==='game'){
			if(this.props.chosen[index])
				return styles.PlayerRowChosen;
			else
				return styles.PlayerRow;
		} else {
			if(this.props.roles[index])
				return styles.PlayerRowResistance;
			else
				return styles.PlayerRowSpy;
		}
	}

	render() {
		return(
			<View style={styles.Players}>
				<ScrollView showsVerticalScrollIndicator={false}>
				{Object.keys(this.props.players).map((key,index)=>{
					return(
						<TouchableOpacity key={index} 
						style={this.styleForPlayer(index)}
						onPress={this.props.ChoosePlayer.bind(this,index)}>
							<Text style={styles.PlayerText}>
							{index+1}.{this.props.players[key]}
							</Text>
						</TouchableOpacity>
					);	
				})}
				</ScrollView>
			</View>
		);
	}
};

export default PlayersList;

PlayersList.defaultProps={
	ChoosePlayer:()=>{},
	chosen:[],
	roles:[]
};

const styles=StyleSheet.create({
	Players:{
		height:Game_Players_Height,
		width:Game_Players_Width,
		borderWidth: Game_Players_BorderWidth,
		borderColor: Game_Players_BorderColor,
		borderStyle: 'solid',
		borderRadius: Game_Players_BorderRadius,
		backgroundColor: 'white',
		flexDirection: 'column',
		alignItems: 'center'
	},
	PlayerRow:{
		height: Game_PlayerRow_Height,
		justifyContent: 'center',
		alignItems: 'center',
		width:Game_PlayerRow_Width,
		borderWidth: 1,
		borderColor: Game_PlayerRow_BorderColor,
		borderStyle: 'solid',
		borderRadius: Game_Players_BorderRadius,
		marginTop: Game_PlayerRow_MarginTop,
		backgroundColor: 'white',
	},
	PlayerRowSpy:{
		height: Game_PlayerRow_Height,
		justifyContent: 'center',
		alignItems: 'center',
		width:Game_PlayerRow_Width,
		borderWidth: 1,
		borderColor: Game_PlayerRow_BorderColor,
		borderStyle: 'solid',
		borderRadius: Game_Players_BorderRadius,
		marginTop: Game_PlayerRow_MarginTop,
		backgroundColor: 'red',
	},
	PlayerRowResistance:{
		height: Game_PlayerRow_Height,
		justifyContent: 'center',
		alignItems: 'center',
		width:Game_PlayerRow_Width,
		borderWidth: 1,
		borderColor: Game_PlayerRow_BorderColor,
		borderStyle: 'solid',
		borderRadius: Game_Players_BorderRadius,
		marginTop: Game_PlayerRow_MarginTop,
		backgroundColor: 'blue',
	},
	PlayerRowChosen:{
		height: Game_PlayerRow_Height,
		justifyContent: 'center',
		alignItems: 'center',
		width:Game_PlayerRow_Width,
		borderWidth: 1,
		borderColor: Game_PlayerRow_BorderColor,
		borderStyle: 'solid',
		borderRadius: Game_Players_BorderRadius,
		marginTop: Game_PlayerRow_MarginTop,
		backgroundColor: Game_Players_ChosenColor,
	},
	PlayerText:{
		fontSize: 20,
		fontWeight: "300",
	}
});