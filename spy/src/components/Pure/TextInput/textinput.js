import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

class Input extends React.Component {
	render() {
		return(
			<TextInput style={styles.TextInput}
			placeholder={this.props.placeholder}
			value={this.props.value}
			onChangeText={this.props.onChangeText}
			onSubmitEditing={this.props.onSubmitEditing}
			/>
		);
	}
};

export default Input;

Input.defaultProps={
	placeholder:'',
	value:'',
	onSubmitEditing:()=>{},
	onChangeText:()=>{}
};

const styles=StyleSheet.create({
	TextInput:{
		height:50,
		width: 150,
		backgroundColor: 'red',
		borderWidth: 2,
		borderColor: 'black',
		borderStyle: 'solid',
		borderRadius: 10,
		paddingLeft: 10,
		paddingRight: 10,
		justifyContent: 'center',
		alignItems: 'center'
	}
});