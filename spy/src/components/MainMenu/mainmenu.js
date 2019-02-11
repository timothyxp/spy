import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';

import {styles} from './mainmenustyle.js';

class MainMenu extends React.Component {
	constructor(){
		super();
		this.state={
			userId:0
		};
	}

	async GetId() {
    	try {
    	  const value = await AsyncStorage.getItem('@spy:id');
    	  return value;
    	} catch(error) {
    	  console.log('Cant get ID:' + error);
		}
  	}

  	componentDidMount() {
  		this.GetId()
  		.then(value=>{
  			this.setState({
  				userId:value
  			});
  		});
  	}

	render() {
		return(
			<View style={styles.MainMenu}>
				<View style={styles.Content}>
					<TouchableOpacity style={styles.button_Game}
					onPress={()=>{this.props.router.push.GameMenu({
						userId:this.state.userId
					})}}>
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