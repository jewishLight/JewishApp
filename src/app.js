import React, {Component} from 'react';
import {StatusBar, Platform} from 'react-native';
import AppNavigation from './routing';

StatusBar.setHidden(false);
StatusBar.setBarStyle('light-content');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.disableYellowBox = true;
    debugger;
  }

  render() {
    return <AppNavigation />;
  }
}

export default App;
