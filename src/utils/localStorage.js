import Storage from "./storageModel";
import Strings from "./string";

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
}

export default LocalStorage;
