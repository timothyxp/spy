import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {PLayerChatIcon_BorderRadius,
	PlayerChatIcon_BorderWidth,
	PlayerChatIcon_BorderColor,
	PlayerChatIcon_Size} from '../../../styles/common.js';

class PlayerChatIcon extends React.Component {
	render() {
		return(
			<View style={styles.PlayerChatIcon}>
				<Text style={styles.PlayerChatIconText}>
					{this.props.number}
				</Text>
			</View>
		);
	}
};

export default PlayerChatIcon;

const styles=StyleSheet.create({
	PlayerChatIcon:{
		width: PlayerChatIcon_Size,
		height: PlayerChatIcon_Size,
		borderRadius: PLayerChatIcon_BorderRadius,
		borderWidth: PlayerChatIcon_BorderWidth,
		borderColor: PlayerChatIcon_BorderColor,
		borderStyle: 'solid',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 5,
	},
	PlayerChatIconText:{
		fontSize: 15,
		color:'black',
		fontWeight: "300",
	}
});