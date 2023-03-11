import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const GetUserAPi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/users/me`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
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
