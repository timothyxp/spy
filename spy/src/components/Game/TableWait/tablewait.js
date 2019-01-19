import React from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';

import {Menu_Background} from '../../../styles/common.js'; 

import database from '../../../firebase/firebase.js';

class TableWait extends React.Component {
	constructor() {
		super();
		this.state = {
			userId:'none'
		}
	}

	 async GetId() {
    	try {
    	  const value = await AsyncStorage.getItem('@spy:id');
    	  return value;
    	} catch(error) {
    	  console.log('Cant get ID:' + error);
		}
  	}

	componentDidMount() {
		this.GetId()
		.then(value => {
			if(value!==null){
				this.setState({
					userId:value
				});
			}
		});
	}

	render() {
		console.log(this.props.tableRef);
		return(
			<View style={styles.TableWait}>
				
				<Text>TableWait</Text>
			</View>
		);
	}
}

export default TableWait;

const styles=StyleSheet.create({
	TableWait:{
		backgroundColor: Menu_Background,
		flex: 1
	}
})