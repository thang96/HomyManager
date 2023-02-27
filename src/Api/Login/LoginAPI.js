import axios from 'axios';
import {BASEURL} from '../BASEURL';
export const LoginAccessToken = (username, password) => {
  const formData = new FormData();
  formData.append('username', `${username}` ?? '');
  formData.append('password', `${password}` ?? '');
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/login/access-token`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};

export const LoginTestToken = token => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/login/test-token`, null, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};
