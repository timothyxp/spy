import {StyleSheet, Dimensions} from 'react-native';

const Screen_Width = Dimensions.get('window').width;

const Icon_Width = 200;

export const styles=StyleSheet.create({
	Page:{
		flexDirection: 'column',
		flex: 1,
	},
	BrowseButtonText:{
		fontSize: 26,
		color:'blue',
		textDecorationLine: 'underline',
	},
	Header:{
		flexGrow:1,
		flex: 1,
		width: Screen_Width,
		backgroundColor: 'red',
		borderBottomWidth: 2,
		borderBottomColor: 'black',
		borderStyle: 'solid',
		alignItems: 'center',
		justifyContent: 'center',
	},
	HeaderText:{
		color: 'black',
		fontSize: 20,
	},
	Concerts:{
		flexGrow:9,
		flex: 1,
		width:Screen_Width,
		backgroundColor: 'green',
		alignItems: 'center'
	},
	ScrollView:{
		backgroundColor: 'white',
		width:Screen_Width,
	},
	Concert:{
		width: Screen_Width,
		height: 250,
		borderBottomWidth: 1,
		borderBottomColor: 'white',
		borderStyle: 'solid',
		flexDirection: 'row',
	},
	Icon:{
		width:Icon_Width,
		height:249,
		backgroundColor: 'black',
	},
	Info:{
		width:Screen_Width-Icon_Width,
		flex: 1,
		backgroundColor: 'purple',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	ButtonHere:{
		height:50,
		width: 120,
	}
});