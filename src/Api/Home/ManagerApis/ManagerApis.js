import axios from 'axios';
import {BASEURL} from '../../BASEURL';

export const GetListManagersApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/managers`, {
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

export const CreateNewManagerApi = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/managers`, data, {
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

export const GetManagerDetailApi = (token, managerId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/managers/${managerId}`, {
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
