import React from 'react';
import {View, Text} from 'react-native';

class Settings extends React.Component {
	render() {
		return(
			<View>
				<Text onPress={()=>{this.props.router.pop()}}>Back</Text>
				<Text>Settings</Text>
			</View>
		);
	}
}

export default Settings;