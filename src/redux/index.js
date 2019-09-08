import {combineReducers} from 'redux';
import configureStore from './createStore';
import AppSettingsActions, {
  appSettingsReducer as appSettings,
} from './appSettings';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    appSettings,
  });
  return configureStore(rootReducer);
};

export {AppSettingsActions};
