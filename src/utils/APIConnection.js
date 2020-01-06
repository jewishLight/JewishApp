import {Platform} from 'react-native';
// const BASIC_URL = 'http://4d14932e.ngrok.io/';
const BASIC_URL = 'https://jworld.startach.org.il/';
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
    if (method === 'GET') {
      if (body === {} || body === '' || body === null) {
        header = {
          method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
      } else {
        header = {
          method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        };
      }
    } else if (method === 'POST') {
      header = {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      };
    } else if (method === 'PUT') {
      header = {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      };
    } else {
      header = {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
    }
  }

  return new Promise(async (resolve, reject) => {
    const onSuccess = async response => {
      if (response.status >= 200 && response.status <= 300) {
        // const fetchResult = await response.json();
        let data = await response.text();
        if (Platform.OS === 'android') {
          // data = data.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, '');
        }
        data = JSON.parse(data);
        return resolve(data);
      }
      console.log('APIConnection', response);
      let data = await response.text();
      console.log('APIConnection data', data);

      if (Platform.OS === 'android') {
        // data = data.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, '');
      }
      data = JSON.parse(data);
      return resolve(data);
    };
    fetch(`${BASIC_URL}${url}`, header)
      .then(onSuccess)
      .catch(error => reject(error));
  });
};

export const ApiRequestWithoutToken = (url, body = '', method = 'GET') => {
  let header;

  header = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

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
