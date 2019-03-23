import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react'

export default class Button extends React.Component {
	render() {
		return(
			<TouchableOpacity style={styles.Button}
			 type={this.props.type} 
			 onPress={this.props.onClick}>
			 {this.props.children}
			</TouchableOpacity>
		);
	}
}

Button.defaultProps={
	onClick:()=>{}
};

const styles=StyleSheet.create({
	Button:{
		backgroundColor: '#3ab9c4',
	  	textAlign:  'center',
	  	fontSize: 20,
	  	color: 'black',
	  	borderRadius: 20,
	  	padding: 6,
	  	borderWidth: 2,
	  	borderColor: '#cbe6e8',
	  	borderStyle: 'solid',
	  	overflow: 'hidden',
	  	justifyContent: 'center',
	  	alignItems: 'center'
  	},
});