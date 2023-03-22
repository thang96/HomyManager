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

export const PutContractAPi = (token, data, serviceId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/contracts/${serviceId}`, data, {
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

export const PostImageContractApi = (token, contractId, ContractImages) => {
  let formContract = new FormData();
  for (let i = 0; i < ContractImages.length; i++) {
    let image = ContractImages[i];
    formContract.append('files', {
      uri: image?.uri,
      name: getFileName(image),
      type: 'image/jpeg',
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/contract/${contractId}/files/upload`, formContract, {
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
