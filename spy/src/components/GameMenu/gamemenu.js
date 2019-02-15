import React from 'react';
import {Text, View,
 TouchableOpacity, ScrollView, Image} from 'react-native';
import {styles} from './gamemenustyle.js';

import server from '../../../server.json';

import database from '../../firebase/firebase.js';

let socket;

class GameMenu extends React.Component {
	constructor() {
		super();
		this.state={
			tables:{}
		};
	}

	componentDidMount() {
		socket = new WebSocket("ws:"+server.adress+
			"/tables"+
			"?userId="+this.props.userId);
			
		socket.onmessage = event => {
			console.log("Получены данные " + event.data);
			let items=JSON.parse(event.data)
			if(items.type!==undefined){
				if(items.type=="Connect"){
					this.props.router.push.TableWait({
						tableId:items.tableId,
						admin:false,
						userId:this.props.userId
					});
				}
			} else {
				this.setState({
					tables:{...items}
				});
			}
		};
		/*firebase 
		let tableRef = database().ref('tables');

		tableRef.on('value', snapshot => {
			let items = snapshot.val();

			this.setState({
				tables:{...this.state.tables,...items}
			});
		});*/
	}

	componentWillUnmount() {
		socket.close();
	}

	AddTable = () => {
		
		let tableId=Math.floor(Math.random()*(1e9));

		let NewTable={
			type:"NewTable",
			tableId:tableId,
			size:2,
			players:0
		}

		socket.send(JSON.stringify(NewTable));

		/*firebase
		let tableRef = database().ref('tables');
		let NewTableRef = tableRef.push(NewTable);*/

		//tableRef.off();

		this.props.router.push.TableWait({
			/*tableRef:NewTableRef,*/
			userId:this.props.userId,
			tableNumber:Object.keys(this.state.tables).length + 1,
			tableId:tableId,
			admin:true,
			size:1,
			socket:socket
		});
	}

	GoToTable = (key, index, event) => {
		event.preventDefault();
		let table=this.state.tables[key];
		if(table.size <= table.players)
			return;

		let Connect={
			type:"TableConnect",
			tableId:table.tableId,
			playerId:Number(this.props.userId)
		}

		socket.send(JSON.stringify(Connect));

		/*let tables=database().ref('tables');

		//tables.off();

		this.props.router.push.TableWait({
			tableRef:database().ref('tables/'+key),
			tableNumber:index+1,
			tableId:table.tableId,
			admin:false,
			size:table.size
		});*/
	}

	render() {
		return(
			<View style={styles.GameMenu}>
				<View style={styles.Header}>
					<TouchableOpacity style={styles.Back} 
					onPress={()=>{this.props.router.pop()}}>
						<Text style={styles.Text}>Back</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.Content}>
					<TouchableOpacity style={styles.AddTable}
					onPress={this.AddTable}>
						<Text style={styles.Text_AddTable}>New</Text>
						<Image source={require('../../images/newTable.png')}/>
					</TouchableOpacity>
					<View style={styles.ScrollView}>
						<ScrollView>
							{Object.keys(this.state.tables).map((key, index) => {
								let table=this.state.tables[key];
								return <TouchableOpacity key={index} 
								style={table.size <= table.players ? styles.TableBusy
									:styles.Table}
								onPress={this.GoToTable.bind(this, key, index)}>
									<Text style={styles.Text}>Table {index + 1}</Text>
								</TouchableOpacity>
							})}
						</ScrollView>
					</View>
				</View>
			</View>
		);
	}
}

export default GameMenu;