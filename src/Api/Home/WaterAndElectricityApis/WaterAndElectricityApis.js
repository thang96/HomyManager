import axios from 'axios';
import {BASEURL} from '../../BASEURL';

export const GetAllInvoiceUnClosingsApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/invoice-closings`, {
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

export const GetListInvoiceUnClosingsApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/invoice-closings/un-closings`, {
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

export const GetDetailInvoiceUnClosingsApi = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/invoice-closings/${id}`, {
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

export const PutInvoiceUnClosingsApi = (token, data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/invoice-closings/${id}`, data, {
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

export const GetInvoiceRequestClosingsApi = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/invoice-closings/${id}/request-closing`, {
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

export const PostInvoiceRequestClosingsApi = (token, data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/invoice-closings/${id}/confirm-closing`, data, {
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
