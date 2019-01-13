import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Router from 'react-native-easy-router';
import database from './src/firebase/firebase.js';
import MainMenu from './src/components/MainMenu/mainmenu.js';
import Settings from './src/components/Settings/settings.js';
import GameMenu from './src/components/GameMenu/gamemenu.js';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const routes={MainMenu, Settings, GameMenu};

export default class App extends Component {
    render() {
      database().ref('users/004').set({name:'kek'})
      .then(()=>console.log('complete'),()=>console.log('error'));
      return (
        <Router routes={routes} initialRoute="MainMenu"/>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F500FF',
  },
  Intro: {
  	flex:1,
  	backgroundColor:'#FFFFFF'
  },
  Concl: {
  	flex:1,
  	backgroundColor:'#FFFF00'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
