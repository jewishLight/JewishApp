import Storage from './storageModel';
import Strings from './string';

class LocalStorage {
  static setLanguage = async language => {
    try {
      Storage.setItem(Strings.LS_LANGUAGE, language);
    } catch (e) {}
  };

  static getLanguage = async () => {
    let language = null;
    try {
      language = await Storage.getItem(Strings.LS_LANGUAGE);
    } catch (e) {}
    return language;
  };

  static removeLanguage = async () => {
    try {
      await Storage.removeItem(Strings.LS_LANGUAGE);
      return true;
    } catch (e) {
      return false;
    }
  };

  static setIntroChecked = async checked => {
    let stringChecked =
      checked === true ? Strings.FLAG_TRUE : Strings.FLAG_FALSE;
    try {
      await Storage.setItem(Strings.INTRO_CHECKED, stringChecked);
    } catch (e) {}
  };

  static getIntroChecked = async () => {
    let checked = null;
    try {
      checked = await Storage.getItem(Strings.INTRO_CHECKED);
    } catch (e) {}
    return checked === Strings.FLAG_TRUE;
  };

  static setLoggedIn = async isLoggedIn => {
    let stringLogged =
      isLoggedIn === true ? Strings.FLAG_TRUE : Strings.FLAG_FALSE;
    try {
      await Storage.setItem(Strings.LOGGED_IN, stringLogged);
    } catch (e) {}
  };

  static getLoggedIn = async () => {
    let isLoggedIn = null;
    try {
      isLoggedIn = await Storage.getItem(Strings.LOGGED_IN);
    } catch (e) {}
    return isLoggedIn === Strings.FLAG_TRUE;
  };

  static setToken = async token => {
    try {
      await Storage.setItem(Strings.TOKEN, token);
    } catch (e) {}
  };

  static getToken = async () => {
    let token = null;
    try {
      token = await Storage.getItem(Strings.TOKEN);
    } catch (e) {}
    return token;
  };
}

export default LocalStorage;
