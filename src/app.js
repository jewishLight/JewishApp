import React, {Component} from 'react';
import {StatusBar, Platform} from 'react-native';
import AppNavigation from './routing';

import i18n from 'i18n-js';
import en from './constants/translateEn';
import he from './constants/translateHe';

StatusBar.setHidden(false);
StatusBar.setBarStyle('light-content');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.disableYellowBox = true;
  }

  render() {
    return <AppNavigation />;
  }
}

export default App;
