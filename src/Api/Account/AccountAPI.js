import axios from 'axios';
import { BASEURL } from '../BASEURL';

const ReadUserAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/users/me`, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
const UpdateUserMeAPI = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/api/v1/users/me`, data, {
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

const UpdateUserAvatarAPI = async (token, img) => {
  const formData = new FormData();
  formData.append('image', {
    uri: Platform.OS === 'ios' ? '/private' + img?.path : img?.uri,
    name: img?.name,
    type: img?.type,
  });

  return new Promise((resole, reject) => {
    axios
      .post(`${BASEURL}/api/v1/users/me/avatar`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        resole(res);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};
const ChangePasswordAPI = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/users/me/reset-password/`, data, {
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
const AccountAPI = {
  ReadUserAPI,
  UpdateUserAvatarAPI,
  ChangePasswordAPI,
  UpdateUserMeAPI,
};
export default AccountAPI;
