import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import PlayerChatIcon from '../../Pure/PlayerChatIcon/PlayerChatIcon.js';

class EventBox extends React.Component {
	constructor() {
		super();
		this.state={
			scrollYmax:0,
			scrollY:0
		};
	}

	getEvents() {
		if(!this.props.events)
			return;
		return this.props.events.map((key,index)=>{
			if(key.type==='message'){
				return(
					<View key={index} style={styles.Message}>
						<PlayerChatIcon number={key.player+1}/>
						<Text  style={styles.MessageText}>
							:{key.message}
						</Text>
					</View>
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
					<View key={index} style={styles.AcceptTeam}>
						<Text style={styles.AcceptTeamText}>Состав из </Text>
						{key.chosen.map((key,index)=>{
							if(key)
								return(
									<PlayerChatIcon key={index} number={index+1}/>
								);
						})} 
						<Text style ={styles.AcceptTeamText}> выбран</Text>
					</View>
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

	onScroll = (event) => {
		let height=event.nativeEvent.contentOffset.y;
		if(height>this.state.scrollY){
			this.setState({
				scrollYmax:height,
				scrollY:height
			});
		} else {
			this.setState({
				scrollY:height
			});
		}
	}

	onContentSizeChange = (width,height) => {
		if(this.state.scrollY===this.state.scrollYmax)
			this.refs.scrollView.scrollTo({y:height});
	}

	render() {
		return (
			<ScrollView onContentSizeChange={this.onContentSizeChange}
			onScroll={this.onScroll}
			ref="scrollView">
				{this.getEvents()}
			</ScrollView>
		);
	}
}

export default EventBox;

const styles=StyleSheet.create({
	Message:{
		marginLeft: 10,
		marginTop: 5,
		flexDirection: 'row',
		alignItems: 'center'
	},
	MessageText:{
		fontSize: 15,
	},
	AcceptTeam:{
		alignSelf: 'center',
		flexDirection: 'row',
	},
	AcceptTeamText:{
		fontSize: 15,
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