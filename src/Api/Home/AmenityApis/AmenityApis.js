import axios from 'axios';
import {BASEURL} from '../../BASEURL';

export const GetListAmenitysApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/amenities`, {
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

export const GetAmenityDetalApi = (token, amenitieId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/amenities/${amenitieId}`, {
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

export const CreateNewAmenityApi = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/amenities`, data, {
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

export const PutAmenityApi = (token, data, amenitieId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/amenities${amenitieId}`, data, {
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

export const DeleteAmenityApi = (token, amenitieId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/amenities${amenitieId}`, {
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
