import axios from 'axios';
import {BASEURL} from '../../BASEURL';

export const GetListTenantsApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/tenants`, {
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

export const CreateNewTenantApi = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/tenants`, data, {
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

export const GetTenantDetailApi = (token, tenantId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/tenants/${tenantId}`, {
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

export const PutTenantApi = (token, data, tenantId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/tenants/${tenantId}`, data, {
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

export const DeleteTenantApi = (token, tenantId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/tenants/${tenantId}`, {
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
