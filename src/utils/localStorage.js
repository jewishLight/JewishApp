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

  static getMyLocation = async () => {
    let location = null;
    try {
      location = await Storage.getItem('MYLOCATION');
    } catch (e) {}
    return location;
  };

  static setMyLocation = async location => {
    try {
      Storage.setItem('MYLOCATION', location);
    } catch (e) {}
  };

  static getMyLatitude = async () => {
    let latitude = null;
    try {
      latitude = await Storage.getItem('MYLATITUDE');
    } catch (e) {}
    return parseFloat(latitude);
  };

  static setMyLatitude = async latitude => {
    try {
      Storage.setItem('MYLATITUDE', latitude.toString());
    } catch (e) {}
  };

  static getMyLongitude = async () => {
    let longitude = null;
    try {
      longitude = await Storage.getItem('MYLONGITUDE');
    } catch (e) {}
    return parseFloat(longitude);
  };

  static setMyLongitude = async location => {
    try {
      Storage.setItem('MYLONGITUDE', location.toString());
    } catch (e) {}
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

  static setUserId = async token => {
    try {
      await Storage.setItem('USERID', token);
    } catch (e) {}
  };

  static getUserId = async () => {
    let token = null;
    try {
      token = await Storage.getItem('USERID');
    } catch (e) {}
    return token;
  };

  static setLoginType = async loginType => {
    try {
      await Storage.setItem(Strings.LOGIN_TYPE, loginType);
    } catch (e) {}
  };

  static getLoginType = async () => {
    let loginType = null;
    try {
      loginType = await Storage.getItem(Strings.LOGIN_TYPE);
    } catch (e) {}
    return loginType;
  };
}

export default LocalStorage;
