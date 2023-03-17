import axios from 'axios';
import {BASEURL} from '../../BASEURL';

export const GetListContractsApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/contracts`, {
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

export const GetContractDetailAPi = (token, serviceId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/contracts/${serviceId}`, {
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

export const CreateNewContract = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/contracts`, data, {
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
