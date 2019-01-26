import {StyleSheet} from 'react-native';

import {Menu_Background,
Menu_Button_Unusual_Color,
Menu_Button_Border_Unusual_Color,
Menu_Button_Border_Width,
Menu_Button_Width,
Menu_Button_Heigth,
Menu_Button_Border_Usual_Color,
Menu_Text_Unusual_Color,
Menu_Text_Size,
GameWait_Header_Height,
GameWait_PlayersList_Width,
GameWait_PlayersList_Heigth,
GameWait_PlayersList_Kick_Color,
GameWait_PlayersList_Kick_FontSize,
Game_Content_Background,
Game_Content_Border_Color,
Game_Content_Border_Width,
Game_Content_Border_Radius,
Game_Button_Background,
Game_AddTable_Width,
Game_AddTable_Height,
Menu_Button_Border_Radius,
Game_Button_Margin} from '../../../styles/common.js'; 

export const styles = StyleSheet.create({
	TableWait:{
		backgroundColor: Menu_Background,
		flex: 1,
		flexDirection: 'column'
	},
	Header:{
		backgroundColor: Menu_Button_Unusual_Color,
		borderBottomWidth: Menu_Button_Border_Width,
		borderBottomColor: Menu_Button_Border_Unusual_Color,
		borderStyle: 'solid',
		justifyContent: 'center',
		alignItems: 'center',
		height: GameWait_Header_Height
	},
	TableText:{
		color: Menu_Text_Unusual_Color,
		fontSize: Menu_Text_Size
	},
	Content:{
		marginTop: GameWait_Header_Height,
		justifyContent: 'center',
		alignItems: 'center'
	},
	PlayerList:{
		backgroundColor: Game_Content_Background,
		borderWidth: Game_Content_Border_Width,
		borderColor: Game_Content_Border_Color,
		borderStyle: 'solid',
		width: GameWait_PlayersList_Width,
		height: GameWait_PlayersList_Heigth,
		borderRadius:Game_Content_Border_Radius,
		alignItems: 'center',
		flexDirection: 'column'
	},
	AddPlace:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'green',
		width:Game_AddTable_Width,
		height:Game_AddTable_Height,
		marginBottom:20,
		borderStyle:'solid',
		borderWidth:Menu_Button_Border_Width,
		borderColor:'yellow',
		borderRadius:Menu_Button_Border_Radius
	},
	Text_AddPlace:{
		color:'black',
		fontSize: Menu_Text_Size
	},
	Player:{
		width:Menu_Button_Width,
		height:Menu_Button_Heigth,
		flexDirection: 'row',
		alignItems:'center',
		backgroundColor:Game_Button_Background,
		justifyContent:'center',
		borderStyle:'solid',
		borderWidth:Menu_Button_Border_Width,
		borderColor:Menu_Button_Border_Usual_Color,
		marginLeft: Game_Button_Margin,
		marginRight: Game_Button_Margin
	},
	PlayerText:{
		color: Menu_Text_Unusual_Color,
		fontSize: Menu_Text_Size
	},
	PlayerNone:{
		width:Menu_Button_Width,
		height:Menu_Button_Heigth,
		flexDirection: 'row',
		alignItems:'center',
		backgroundColor:'green',
		justifyContent:'center',
		borderStyle:'solid',
		borderWidth:Menu_Button_Border_Width,
		borderColor:Menu_Button_Border_Usual_Color,
		marginLeft: Game_Button_Margin,
		marginRight: Game_Button_Margin
	},
	Kick:{
		color:GameWait_PlayersList_Kick_Color,
		fontSize: GameWait_PlayersList_Kick_FontSize
	}
});