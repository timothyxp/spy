import firebase from 'react-native-firebase';

var config = {
    apiKey: "AIzaSyC2-CwXZLKgY3K035DaL-yaj6rit4IljiY",
    authDomain: "resistance-52908.firebaseapp.com",
    databaseURL: "https://resistance-52908.firebaseio.com",
    projectId: "resistance-52908",
	storageBucket: "resistance-52908.appspot.com",
	messagingSenderId: "679335330579"
};

let instants;

export default () => {
	if(!instants){
		instants=firebase.initializeApp(config);
	}

	return instants.database();
};