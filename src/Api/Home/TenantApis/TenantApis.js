import axios from 'axios';
import {BASEURL} from '../../BASEURL';

export const GetListTenants = token => {
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
