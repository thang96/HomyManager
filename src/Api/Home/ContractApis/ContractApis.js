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

export const GetContractDetailAPi = (token, contractId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/contracts/${contractId}`, {
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

export const CreateNewContractApi = (token, data) => {
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

export const GetActiveContractApi = (token, unitId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/units/${unitId}/contracts/getActiveContract`, {
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

export const PutContractAPi = (token, data, contractId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/contracts/${contractId}`, data, {
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

export const DeleteContractAPi = (token, serviceId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/contracts/${serviceId}`, {
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
