import axios from 'axios';
import {BASEURL} from '../BASEURL';
export const ReadNotificationAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/notification/`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          page_size: 1000,
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
export const RegisterNotificationAPI = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/notification_device/register`, data, {
        headers: {
          'Content-Type': 'application/json',
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
export const DeleteNotificationAPI = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/api/v1/notification_device`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data,
      })
      .then(res => {
        resolve(res);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
