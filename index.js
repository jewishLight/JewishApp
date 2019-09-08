/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/app';
import {Provider} from 'react-redux';
import createStore from './src/redux';
const store = createStore();
import {name as appName} from './app.json';

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
