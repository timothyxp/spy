import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import Router from 'react-native-easy-router';
import database from './src/firebase/firebase.js';
import MainMenu from './src/components/MainMenu/mainmenu.js';
import Settings from './src/components/Settings/settings.js';
import GameMenu from './src/components/GameMenu/gamemenu.js';
import TableWait from './src/components/Game/TableWait/tablewait.js';
import Game from './src/components/Game/Game/game.js';

const routes = {MainMenu, Settings, GameMenu, TableWait, Game};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      userId:Math.floor(Math.random()*1e9)
    }
    database();
  }

  async GetId() {
    try {
      const value = await AsyncStorage.getItem('@spy:id');
      return value;
    } catch(error) {
      console.log('Cant get ID:' + error);
    }
  }

  async SetId(value) {
    try {
      await AsyncStorage.setItem('@spy:id', value);
    } catch(error) {
      console.log('Cant set ID:' + error);
    }
  }

  componentDidMount() {
    this.GetId()
    .then(value=>{
      if(value!==null){
        this.setState({
          userId:value
        });
      } else {
        this.SetId(String(this.state.userId));
      }
    });
  }

  render() {
      return (
        <Router routes={routes} initialRoute="MainMenu"/>
      );
  }
}