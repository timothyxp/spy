import {StyleSheet} from 'react-native';

import {
	FinishGame_Events_Width,
	FinishGame_Events_Height,
	FinishGame_Events_Background,
	FinishGame_Events_BorderWidth,
	FinishGame_Events_BorderBackground,
	FinishGame_Events_BorderRadius,
	FinishGame_Events_MarginBottom,
	Menu_Button_Unusual_Color,
	Menu_Button_Usual_Color,
	Menu_Button_Border_Unusual_Color,
	Menu_Button_Border_Usual_Color,
	Menu_Button_Width,
	Menu_Button_Heigth,
	Menu_Button_Border_Width,
	Menu_Button_Border_Radius,
	Menu_Text_Size,
	Menu_Text_Usual_Color,
} from '../../../styles/common.js';

export const styles=StyleSheet.create({
	FinishGameSpy:{
		backgroundColor: 'red',
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	FinishGameResistance:{
		backgroundColor:'#030155',
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	MessageBox:{
		flexBasis: FinishGame_Events_Height,
		flexShrink:1,
		width: FinishGame_Events_Width,
		borderWidth: FinishGame_Events_BorderWidth,
		borderColor: FinishGame_Events_BorderBackground,
		borderStyle: 'solid',
		borderRadius: FinishGame_Events_BorderRadius,
		backgroundColor: FinishGame_Events_Background,
		marginBottom: FinishGame_Events_MarginBottom,
	},
	Button:{
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
	Button_Text:{
		color:Menu_Text_Usual_Color,
		fontSize: Menu_Text_Size
	}
});