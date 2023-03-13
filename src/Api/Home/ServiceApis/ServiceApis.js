import axios from 'axios';
import {BASEURL} from '../../BASEURL';

export const GetListServicesApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/services`, {
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

export const GetServiceDetailAPi = (token, serviceId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/services/${serviceId}`, {
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

export const CreateNewService = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/services`, data, {
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
