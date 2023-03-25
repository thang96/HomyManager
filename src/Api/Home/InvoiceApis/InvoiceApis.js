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

export const PostImageInvoiceApi = (token, invoiceId, invoiceImages) => {
  let formInvoice = new FormData();
  for (let i = 0; i < invoiceImages.length; i++) {
    let image = invoiceImages[i];
    formInvoice.append('files', {
      uri: image?.uri,
      name: getFileName(image),
      type: 'image/jpeg',
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${BASEURL}/invoices/${invoiceId}/files/upload-service`,
        formInvoice,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )
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
