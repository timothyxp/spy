import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {styles} from './mainmenustyle.js';

class MainMenu extends React.Component {
	render() {
		return(
			<View style={styles.MainMenu}>
				<View style={styles.Content}>
					<TouchableOpacity style={styles.button_Game}
					onPress={()=>{this.props.router.push.GameMenu({})}}>
						<Text style={styles.Text_Game}>Game</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}
					onPress={()=>{this.props.router.push.Settings({})}}>
						<Text style={styles.Text}>Settings</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.Text}>Rules</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.Text}>Any</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default MainMenu;