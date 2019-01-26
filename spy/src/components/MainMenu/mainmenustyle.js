import {StyleSheet} from 'react-native';

import {Menu_Background,
Menu_Text_Unusual_Color,
Menu_Text_Usual_Color,
Menu_Button_Unusual_Color,
Menu_Button_Usual_Color,
Menu_Button_Border_Unusual_Color,
Menu_Button_Border_Usual_Color,
Menu_Button_Width,
Menu_Button_Heigth,
Menu_Button_Border_Width,
Menu_Button_Border_Radius,
Menu_Content_Height,
Menu_Text_Size} from '../../styles/common.js';

export const styles=StyleSheet.create({
	MainMenu:{
		flex:1,
		backgroundColor: Menu_Background,
		alignItems:'center',
		justifyContent:'center'
	},
	Content:{
		height:Menu_Content_Height,
		justifyContent:'space-around'
	},
	button:{
		width:Menu_Button_Width,
		height:Menu_Button_Heigth,
		alignItems:'center',
		backgroundColor:Menu_Button_Usual_Color,
		justifyContent:'center',
		borderStyle:'solid',
		borderWidth:Menu_Button_Border_Width,
		borderColor:Menu_Button_Border_Usual_Color,
		borderRadius:Menu_Button_Border_Radius
	},
	button_Game:{
		width:Menu_Button_Width,
		height:Menu_Button_Heigth,
		alignItems:'center',
		backgroundColor:Menu_Button_Unusual_Color,
		justifyContent:'center',
		borderStyle:'solid',
		borderWidth:Menu_Button_Border_Width,
		borderColor:Menu_Button_Border_Unusual_Color,
		borderRadius:Menu_Button_Border_Radius
	},
	Text_Game:{
		color:Menu_Text_Unusual_Color,
		fontSize: Menu_Text_Size
	},
	Text:{
		color:Menu_Text_Usual_Color,
		fontSize: Menu_Text_Size
	}
});