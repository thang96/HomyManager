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

export const PostImageUserApi = (token, userId, userImages) => {
  let formUser = new FormData();
  for (let i = 0; i < userImages.length; i++) {
    let image = userImages[i];
    formUser.append('files', {
      uri: image?.uri,
      name: getFileName(image),
      type: 'image/jpeg',
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/users/${userId}/avatar/upload`, formUser, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
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

const getFileName = file => {
  if (file.name !== undefined) {
    return file.name;
  } else if (file.filename !== undefined && file.filename !== null) {
    return file.filename;
  } else {
    const type = file?.mime || file?.type;
    return (
      Math.floor(Math.random() * Math.floor(999999999)) +
      '.' +
      type.split('/')[1]
    );
  }
};
