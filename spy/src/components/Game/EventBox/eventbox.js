import React from 'react';
import {ScrollView, View, Text} from 'react-native';


class EventBox extends React.Component {
	render() {
		return (
			<ScrollView>
				{this.props.events && 
					Object.keys(this.props.events).map((key,index)=>{
						return(
							<Text key={index}>
							{this.props.events[key].message}
							</Text>
						);
				})}
			</ScrollView>
		);
	}
}

export default EventBox;