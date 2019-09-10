import {Platform} from 'react-native';
const BASIC_URL = 'http://ec609136.ngrok.io/';
import {Strings} from '../utils';

export const ApiRequest = (url, body = '', method = 'GET') => {
  let header;
  let token = Strings.localToken;

  if (token === '') {
    header = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
  } else {
    header = {
      method,
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };
  }

  debugger;

  return new Promise(async (resolve, reject) => {
    const onSuccess = async response => {
      if (response.status >= 200 && response.status <= 300) {
        // const fetchResult = await response.json();
        let data = await response.text();
        if (Platform.OS === 'android') {
          data = data.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, '');
        }
        data = JSON.parse(data);
        return resolve(data);
      }
      let data = await response.text();
      if (Platform.OS === 'android') {
        data = data.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, '');
      }
      data = JSON.parse(data);
      return resolve(data);
    };
    fetch(`${BASIC_URL}${url}`, header)
      .then(onSuccess)
      .catch(error => reject(error));
  });
};
