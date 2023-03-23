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
