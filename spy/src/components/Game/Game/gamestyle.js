import {StyleSheet} from 'react-native';

import {Game_Background,
Game_Footer_Height,
Game_Events_Width,
Game_Events_Height,
Game_Events_Background,
Game_Footer_Width,
Game_Footer_Turn_Width,
Game_Footer_Turn_Border_Background,
Game_Footer_Turn_BorderRadius,
Game_Footer_Turn_Background,
Game_Footer_Turn_BorderWidth,
Game_Events_BorderWidth,
Game_Events_BorderBackground,
Game_Events_BorderRadius} from '../../../styles/common.js';

export const styles=StyleSheet.create({
	Game:{
		backgroundColor: Game_Background,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	Events:{
		height: Game_Events_Height,
		width: Game_Events_Width,
		backgroundColor: Game_Events_Background,
		borderWidth: Game_Events_BorderWidth,
		borderColor: Game_Events_BorderBackground,
		borderStyle: 'solid',
		borderRadius: Game_Events_BorderRadius,
	},
	Content:{
		marginBottom: Game_Footer_Height,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	Footer:{
		height: Game_Footer_Height,
		position: 'absolute',
		bottom: 0,
		left: 0,
		flexDirection: 'row',
		width:Game_Footer_Width
	},
	Turns:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		flex: 1,
	},
	Turn:{
		height:Game_Footer_Turn_Width,
		width:Game_Footer_Turn_Width,
		backgroundColor: Game_Footer_Turn_Background,
		width: Game_Footer_Turn_Width,
		height: Game_Footer_Turn_Width,
		borderWidth: Game_Footer_Turn_BorderWidth,
		borderColor: Game_Footer_Turn_Border_Background,
		borderStyle: 'solid',
		borderRadius: Game_Footer_Turn_BorderRadius,
	}
});