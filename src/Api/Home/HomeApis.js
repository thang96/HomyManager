import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const GetAllHauseApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/house`, {
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

export const HauseDetailApi = (token, hauseId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/house/${hauseId}`, {
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
