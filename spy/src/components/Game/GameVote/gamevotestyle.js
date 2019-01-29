import {StyleSheet} from 'react-native';

import {Game_Background,
Game_Header_BorderWidth,
Game_Header_BorderColor,
Game_Header_Height,
Game_Player_BorderWidth,
Game_Player_Width,
Game_Player_Height,
Game_Player_BorderRadius,
Game_Player_BorderColor,
Game_Players_Width,
Game_Players_Height,
Game_Players_BorderWidth,
Game_Players_BorderColor,
Game_Players_BorderRadius,
Screen_Width,
Screen_Heigth} from '../../../styles/common.js';

export const styles=StyleSheet.create({
	GameVote:{
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
		alignItems: 'center'
	},
	Header_Text:{
		fontSize: 22,
		color: 'black',
	},
	Info:{
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width:Screen_Width,
		flexShrink:1
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
	PlayersTitle:{
		justifyContent: 'center',
		alignItems: 'center',
		width:Game_Players_Width,
		borderBottomWidth: 1,
		borderBottomColor: 'black',
		borderStyle: 'solid',
	},
	PlayersTitleText:{
		fontSize: 22,
		color:'black',
		fontWeight: "400",
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
	PlayerText:{
		color:'black',
		fontSize: 22,
	},
	Vote:{
		flexDirection: 'row',
	},
	Accept:{
		flexBasis:1,
		flexGrow:1,
		height:200,
		backgroundColor: 'green',
	},
	Reject:{
		flexBasis:1,
		flexGrow:1,
		height:200,
		backgroundColor: 'red',
	}
});