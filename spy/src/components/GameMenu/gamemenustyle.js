import {StyleSheet} from 'react-native';

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
Game_AddTable_Height,
Game_Button_Margin,
Menu_Text_Size} from '../../styles/common.js';

export const styles = StyleSheet.create({
	GameMenu:{
		backgroundColor:Menu_Background,
		flex:1,
		alignItems:'center',
		justifyContent:'center'
	},
	Content:{
		marginTop:Game_AddTable_Height,
		flex:1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	ScrollView:{
		backgroundColor:Game_Content_Background,
		borderRadius:Game_Content_Border_Radius,
		borderStyle:'solid',
		minWidth:Game_Button_Margin*2+Menu_Button_Width+2*Menu_Button_Border_Width,
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
		marginLeft:Game_Button_Margin,
		marginRight:Game_Button_Margin,
		marginTop:Game_Button_Margin,
		marginBottom:Game_Button_Margin/2
	},
	TableBusy: {
		width:Menu_Button_Width,
		height:Menu_Button_Heigth,
		alignItems:'center',
		backgroundColor:'#e2e2e2',
		justifyContent:'center',
		borderStyle:'solid',
		borderWidth:Menu_Button_Border_Width,
		borderColor:Menu_Button_Border_Usual_Color,
		borderRadius:Menu_Button_Border_Radius,
		marginLeft:Game_Button_Margin,
		marginRight:Game_Button_Margin,
		marginTop:Game_Button_Margin,
		marginBottom:Game_Button_Margin/2
	},
	Text:{
		color:Menu_Text_Usual_Color,
		fontSize: Menu_Text_Size
	},
	Text_AddTable:{
		color:Menu_Text_Usual_Color,
		fontSize: Menu_Text_Size,
		marginLeft:50,
		marginRight:20
	}
});