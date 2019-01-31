import React from 'react';
import {Text, View} from 'react-native';

class FinishGame extends React.Component {
	constructor() {
		super();
	}

	render() {
		return(
			<View>
				<Text>
					SpyWins-{this.props.spyWins}
					ResWins-{this.props.resWins}
					roles-{this.props.roles}
				</Text>
			</View>
		);
	}
}

export default FinishGame;