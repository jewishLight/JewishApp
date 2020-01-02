import {combineReducers} from 'redux';
import configureStore from './createStore';
import AppSettingsActions, {
  appSettingsReducer as appSettings,
} from './appSettings';
import UserActions, {userReducer} from './user';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    appSettings,
    userReducer,
  });
  return configureStore(rootReducer);
};

export {AppSettingsActions, UserActions};
