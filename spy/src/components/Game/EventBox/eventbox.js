import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';


class EventBox extends React.Component {
	constructor() {
		super();
	}

	getEvents() {
		if(!this.props.events)
			return;
		return this.props.events.map((key,index)=>{
			if(key.type==='message'){
				return(
					<Text key={index} style={styles.Message}>
						{key.message}
					</Text>
				);
			} else if(key.type==='mission'){
				if(key.result==='accept'){
					return(
						<Text key={index} style={styles.MissionAccept}>
							Миссия выполнена
						</Text>
					);
				} else {
					return(
						<Text key={index} style={styles.MissionReject}>
							Миссия провалена
						</Text>
					);
				}
			} else if(key.type==='choose'){
				if(key.result==='accept'){
					return(
						<Text key={index} style={styles.ChooseAccept}>
							Состав принят
						</Text>
					);
				} else {
					return(
						<Text key={index} style={styles.ChooseReject}>
							Состав отвергнут
						</Text>
					);
				}
			} else if(key.type==='acceptTeam'){
				return(
					<Text key={index} style={styles.AcceptTeam}>
						Состав из {key.chosen.map((key,index)=>{
							if(key)
								return index+1;
						})} принят
					</Text>
				);
			} else {
				return(
					<Text key={index}>
						{key.type}
					</Text>
				);
			}
		});
	}

	render() {
		return (
			<ScrollView>
				{this.getEvents()}
			</ScrollView>
		);
	}
}

export default EventBox;

const styles=StyleSheet.create({
	Message:{
	},
	AcceptTeam:{
		alignSelf: 'center'
	},
	ChooseAccept:{
		alignSelf: 'center',
		color:'green'
	},
	ChooseReject:{
		alignSelf: 'center',
		color:'red'
	},
	MissionAccept:{
		alignSelf: 'center',
		color:'green'
	},
	MissionReject:{
		alignSelf: 'center',
		color:'red'
	}
});