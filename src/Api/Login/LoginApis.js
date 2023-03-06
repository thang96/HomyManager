import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const RegisterApi = (username, password) => {
  const data = {
    fullName: 'ThangBui',
    password: password,
    username: username,
    device: 'android',
    email: 'buiducthang1771996@gmail.com',
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/auth/register`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
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

export const AuthenticationAPi = (password, username) => {
  let data = {
    password: password,
    username: username,
    device: '',
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/auth`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
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
