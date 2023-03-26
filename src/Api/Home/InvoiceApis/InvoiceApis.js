import axios from 'axios';
import {BASEURL} from '../../BASEURL';

export const GetListInvoicesApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/invoices`, {
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

export const CreateInvoicesApi = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/invoices`, data, {
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

export const GetInvoiceDetailApi = (token, invoiceId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/invoices/${invoiceId}`, {
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

export const PutInvoiceIssueApi = (token, invoiceId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/invoices/${invoiceId}/issued`, null, {
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

export const PutInvoiceConfirmPaymentApi = (token, invoiceId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/invoices/${invoiceId}/payment-confirm`, null, {
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
