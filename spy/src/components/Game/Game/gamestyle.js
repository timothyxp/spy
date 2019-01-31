import {StyleSheet} from 'react-native';

import {Game_Background,
Game_Turns_Height,
Game_Events_Width,
Game_Events_Height,
Game_Events_Background,
Game_Turns_Turn_Width,
Game_Turns_Turn_Border_Background,
Game_Turns_Turn_BorderRadius,
Game_Turns_Turn_Background,
Game_Turns_Turn_BorderWidth,
Game_Events_BorderWidth,
Game_Events_BorderBackground,
Game_Events_BorderRadius,
Game_Events_MarginBottom,
Game_Header_BorderWidth,
Game_Header_BorderColor,
Game_Header_Height,
Game_Player_BorderWidth,
Game_Player_Width,
Game_Player_Height,
Game_Player_BorderRadius,
Game_Player_BorderColor,
Game_AcceptTeam_BorderWidth,
Game_AcceptTeam_Width,
Game_AcceptTeam_Height,
Game_AcceptTeam_BorderRadius,
Game_AcceptTeam_BorderColor,
Game_AcceptTeam_BackgroundColor,
Game_Players_Width,
Game_Players_Height,
Game_Players_BorderWidth,
Game_Players_BorderColor,
Game_Players_BorderRadius,
Screen_Width,
Screen_Heigth} from '../../../styles/common.js';

export const styles=StyleSheet.create({
	Game:{
		backgroundColor: Game_Background,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		overflow: 'hidden',
	},
	Header:{
		flexBasis: Game_Header_Height,
		flexShrink:1,
		backgroundColor: 'white',
		width: Screen_Width,
		borderBottomWidth: Game_Header_BorderWidth,
		borderBottomColor: Game_Header_BorderColor,
		borderStyle: 'solid',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	Info:{
		flexDirection: 'row',
		justifyContent: 'space-around',
		width:Screen_Width,
		flexShrink:1
	},
	LeftInfo:{
		flexDirection: 'column',
		alignItems: 'center'
	},
	Player:{
		height:Game_Player_Height,
		width:Game_Player_Width,
		backgroundColor: 'blue',
		borderWidth: Game_Player_BorderWidth,
		borderColor: Game_Player_BorderColor,
		borderStyle: 'solid',
		borderRadius: Game_Player_BorderRadius,
	},
	PlayerSpy:{
		height:Game_Player_Height,
		width:Game_Player_Width,
		backgroundColor: 'red',
		borderWidth: Game_Player_BorderWidth,
		borderColor: Game_Player_BorderColor,
		borderStyle: 'solid',
		borderRadius: Game_Player_BorderRadius,
	},
	AcceptTeamActive:{
		height:Game_AcceptTeam_Height,
		width:Game_AcceptTeam_Width,
		backgroundColor: Game_AcceptTeam_BackgroundColor,
		borderWidth: Game_AcceptTeam_BorderWidth,
		borderColor: Game_AcceptTeam_BorderColor,
		borderStyle: 'solid',
		borderRadius: Game_AcceptTeam_BorderRadius,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	AcceptTeamUnActive:{
		height:Game_AcceptTeam_Height,
		width:Game_AcceptTeam_Width,
		backgroundColor: Game_AcceptTeam_BackgroundColor,
		borderWidth: Game_AcceptTeam_BorderWidth,
		borderColor: Game_AcceptTeam_BorderColor,
		borderStyle: 'solid',
		borderRadius: Game_AcceptTeam_BorderRadius,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0000006B',
	},
	AcceptTeamText:{
		fontSize: 18,
		fontWeight: "400",
	},
	Players:{
		height:Game_Players_Height,
		width:Game_Players_Width,
		borderWidth: Game_Players_BorderWidth,
		borderColor: Game_Players_BorderColor,
		borderStyle: 'solid',
		borderRadius: Game_Players_BorderRadius,
		backgroundColor: 'white',
		flexDirection: 'column',
	},
	PlayerRow:{
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		width:Game_Players_Width,
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		borderStyle: 'solid',
	},
	PlayerRowChosen:{
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		width:Game_Players_Width,
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		borderStyle: 'solid',
		backgroundColor: '#04FA5FB6',
	},
	PlayerText:{
		color:'black',
		fontSize: 22,
	},
	Events:{
		flexBasis: Game_Events_Height,
		flexShrink:1,
		width: Game_Events_Width,
		borderWidth: Game_Events_BorderWidth,
		borderColor: Game_Events_BorderBackground,
		borderStyle: 'solid',
		borderRadius: Game_Events_BorderRadius,
		backgroundColor: Game_Events_Background,
		marginBottom: Game_Events_MarginBottom,
	},
	Turns:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width:Screen_Width,
		flexBasis:Game_Turns_Height,
		flexShrink:1
	},
	Turn:{
		height:Game_Turns_Turn_Width,
		width:Game_Turns_Turn_Width,
		backgroundColor: Game_Turns_Turn_Background,
		width: Game_Turns_Turn_Width,
		height: Game_Turns_Turn_Width,
		/*borderWidth: Game_Turns_Turn_BorderWidth,
		borderColor: Game_Turns_Turn_Border_Background,
		borderStyle: 'solid',*/
		borderRadius: Game_Turns_Turn_BorderRadius,
		justifyContent: 'center',
		alignItems: 'center'
	},
	Turn_Text:{
		fontSize: 30,
		fontWeight: "200",
		color: 'black',
	}
});