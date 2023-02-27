import axios from 'axios';
import { BASEURL } from '../../BASEURL';

const GetOpticalCablesAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/optical_cables/`, {
        headers: {
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

const CreateOpticalCablesAPI = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/optical_cables/`, data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
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

const GetOpticalCablesByIdAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/optical_cables/${id}`, {
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
const UpdateOpticalCablesAPI = (token, data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/api/v1/optical_cables/${id}`, data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
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
const DeleteOpticalCablesAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/api/v1/optical_cables/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
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
const OpticalCablesAPI = {
  GetOpticalCablesAPI,
  CreateOpticalCablesAPI,
  GetOpticalCablesByIdAPI,
  UpdateOpticalCablesAPI,
  DeleteOpticalCablesAPI,
};
export default OpticalCablesAPI;
