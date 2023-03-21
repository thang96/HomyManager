import axios from 'axios';
import {BASEURL} from '../../BASEURL';

export const GetListUnitsApi = (token, hauseId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/houses/${hauseId}/units`, {
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

export const GetUnitDetailAPi = (token, unitId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/units/${unitId}`, {
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

export const CreateNewUnitApi = (token, hauseId, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/houses/${hauseId}/units`, data, {
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

export const PutUnitApi = (token, hauseId, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/units/${hauseId}`, data, {
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

export const DeleteUnitApi = (token, hauseId) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/units/${hauseId}`, {
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

export const PostImageUnitApi = (token, unitId, unitImages) => {
  let formUnit = new FormData();
  for (let i = 0; i < unitImages.length; i++) {
    let image = unitImages[i];
    formUnit.append('files', {
      uri: image?.uri,
      name: getFileName(image),
      type: 'image/jpeg',
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/units/${unitId}/files/upload`, formUnit, {
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
