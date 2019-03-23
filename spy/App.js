import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import Router from 'react-native-easy-router';
import Auth from './src/components/Auth/auth.js';
import Browse from './src/components/Browse/browse.js';
import MainMenu from './src/components/MainMenu/mainmenu.js';
const routes = {Auth, MainMenu, Browse};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      token:null
    };
  }

  render() {
    return (
      <Router routes={routes} initialRoute="Auth"/>
    );
  }
}