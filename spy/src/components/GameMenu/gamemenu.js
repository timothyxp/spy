import React from 'react';
import {Text, View, StyleSheet,
 TouchableOpacity, ScrollView, Image} from 'react-native';
import {Menu_Background,
Game_Content_Border_Color,
Game_AddTable_Background,
Game_Button_Background,
Game_Content_Height,
Game_Content_Background,
Game_Content_Border_Width,
Game_Content_Border_Radius,
Menu_Text_Usual_Color,
Menu_Button_Width,
Menu_Button_Heigth,
Menu_Button_Border_Width,
Menu_Button_Border_Usual_Color,
Menu_Button_Border_Radius,
Game_AddTable_Width,
Game_AddTable_Height} from '../../styles/common.js';

import database from '../../firebase/firebase.js';

class GameMenu extends React.Component {
	constructor() {
		super();
		this.state={
			tables:{}
		};
	}

	componentDidMount() {
		let tableRef = database().ref('tables');

		tableRef.on('value', snapshot => {
			let items = snapshot.val();

			this.setState({
				tables:{...this.state.tables,...items}
			});
		});
	}

	AddTable = () => {
		let tableRef = database().ref('tables');
		let tableId=Math.floor(Math.random()*(1e9));

		tableRef.push({
			tableId:tableId
		});
	}

	render() {
		return(
			<View style={styles.GameMenu}>
				<View style={styles.Header}>
					<TouchableOpacity style={styles.Back} 
					onPress={()=>{this.props.router.pop()}}>
						<Text style={styles.Text}>Back</Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.AddTable}
				onPress={this.AddTable}>
					<Text style={styles.Text_AddTable}>New</Text>
					<Image source={require('../../images/newTable.png')}/>
				</TouchableOpacity>
				<View style={styles.Content}>
					<ScrollView>
						{Object.keys(this.state.tables).map((key, index) => {
							return <TouchableOpacity style={styles.Table}>
								<Text style={styles.Text}>Table {index + 1}</Text>
							</TouchableOpacity>
						})}
					</ScrollView>
				</View>
			</View>
		);
	}
}

export default GameMenu;

const styles = StyleSheet.create({
	GameMenu:{
		backgroundColor:Menu_Background,
		flex:1,
		alignItems:'center',
		justifyContent:'center'
	},
	Content:{
		backgroundColor:Game_Content_Background,
		borderRadius:Game_Content_Border_Radius,
		borderStyle:'solid',
		borderColor:Game_Content_Border_Color,
		borderWidth:Game_Content_Border_Width,
		height:Game_Content_Height,
		justifyContent:'space-around'
	},
	AddTable:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:Game_AddTable_Background,
		width:Game_AddTable_Width,
		height:Game_AddTable_Height,
		marginBottom:20,
		borderStyle:'solid',
		borderWidth:Menu_Button_Border_Width,
		borderColor:Menu_Button_Border_Usual_Color,
		borderRadius:Menu_Button_Border_Radius
	},
	Header:{
		position:'absolute',
		left:20,
		top:20
	},
	Back:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:Game_AddTable_Background,
		width:Game_AddTable_Width,
		height:Game_AddTable_Height,
		borderStyle:'solid',
		borderWidth:Menu_Button_Border_Width,
		borderColor:Menu_Button_Border_Usual_Color,
		borderRadius:Menu_Button_Border_Radius
	},
	Table: {
		width:Menu_Button_Width,
		height:Menu_Button_Heigth,
		alignItems:'center',
		backgroundColor:Game_Button_Background,
		justifyContent:'center',
		borderStyle:'solid',
		borderWidth:Menu_Button_Border_Width,
		borderColor:Menu_Button_Border_Usual_Color,
		borderRadius:Menu_Button_Border_Radius,
		marginLeft:20,
		marginRight:20,
		marginTop:20,
		marginBottom:10
	},
	Text:{
		color:Menu_Text_Usual_Color,
		fontSize:22
	},
	Text_AddTable:{
		color:Menu_Text_Usual_Color,
		fontSize:22,
		marginLeft:50,
		marginRight:20
	}
});