import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

import {TextInput_Height,
TextInput_BorderWidth,
TextInput_BorderColor,
TextInput_BorderRadius,
TextInput_BackgroundColor,
TextInput_PaddingLeft,
TextInput_PaddingRight} from '../../../styles/common.js';

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
		height:TextInput_Height,
		backgroundColor: TextInput_BackgroundColor,
		borderTopWidth: TextInput_BorderWidth,
		borderTopColor: TextInput_BorderColor,
		borderStyle: 'solid',
		borderBottomLeftRadius: TextInput_BorderRadius,
		borderBottomRightRadius: TextInput_BorderRadius,
		paddingLeft: TextInput_PaddingLeft,
		paddingRight: TextInput_PaddingRight,
	}
});
