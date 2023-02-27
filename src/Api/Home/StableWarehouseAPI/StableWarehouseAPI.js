import axios from 'axios';
import {BASEURL} from '../../BASEURL';
// Stable Warehouse
export const GetStableWarehouseAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/stable-warehouse/`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          page_size: 1000,
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
export const GetStableWarehouseByIdAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/stable-warehouse/${id}`, {
        headers: {
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
export const GetStableWarehouseSuppliesByIdAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/stable-warehouse/${id}/supplies`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          page_size: 1000,
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
// Supplies
export const GetSuppliesAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/supplies/`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          page_size: 1000,
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
export const GetSuppliesByIdAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/supplies/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          page_size: 1000,
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
export const CreateSuppliesAPI = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/supplies/`, data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          page_size: 1000,
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
export const UpdateSuppliesAPI = (token, data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/api/v1/supplies/${id}`, data, {
        headers: {
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
// Inventory Receiving Voucher
export const GetInventoryReceivingVoucherAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/inventory-receiving-voucher/`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: {
          page_size: 1000,
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

export const CreateAInventoryReceivingVoucherAPI = (
  token,
  stable_warehouse_id,
  receiveTime,
  reason,
  content,
  document_files,
  approve_user_id,
  supplies,
) => {
  return new Promise((resolve, reject) => {
    let formDataCreate = new FormData();
    formDataCreate.append('stable_warehouse_id', stable_warehouse_id ?? 0);
    formDataCreate.append('receive_time', receiveTime.toISOString() ?? '');
    formDataCreate.append('reason', reason ?? '');
    formDataCreate.append('content', content ?? '');
    for (let i = 0; i < document_files.length; i++) {
      let image = document_files[i];
      formDataCreate.append('document_files', {
        uri: image?.uri,
        name: getFileName(image),
        type: 'image/jpeg',
      });
    }
    formDataCreate.append('approve_user_id', approve_user_id ?? 0);
    formDataCreate.append('supplies', JSON.stringify(supplies) ?? '');
    axios
      .post(`${BASEURL}/api/v1/inventory-receiving-voucher/`, formDataCreate, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(function (error) {
        console.log(error, error?.response?.data);
        reject(error);
      });
  });
};

export const GetInventoryReceivingVoucherByIDAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/inventory-receiving-voucher/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
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

export const UpdateAInventoryReceivingVoucherAPI = (
  token,
  idUpdate,
  stable_warehouse_id,
  receiveTime,
  reason,
  content,
  approve_user_id,
  supplies,
) => {
  return new Promise((resolve, reject) => {
    const formDataUpdate = new FormData();
    formDataUpdate.append('stable_warehouse_id', stable_warehouse_id ?? 0);
    formDataUpdate.append('receive_time', receiveTime ?? '');
    formDataUpdate.append('reason', reason ?? '');
    formDataUpdate.append('content', content ?? '');
    formDataUpdate.append('approve_user_id', approve_user_id ?? 0);
    formDataUpdate.append('supplies', JSON.stringify(supplies) ?? '');
    axios
      .put(
        `${BASEURL}/api/v1/inventory-receiving-voucher/${idUpdate}`,
        formDataUpdate,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => {
        resolve(res);
      })
      .catch(function (error) {
        console.log(error, error?.response?.data);
        reject(error);
      });
  });
};

export const ApproveInventoryReceivingVoucher = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/inventory-receiving-voucher/${id}/approve`, id, {
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
export const RejectInventoryReceivingVoucher = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/inventory-receiving-voucher/${id}/reject`, id, {
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
// Inventory Delivery Voucher
export const GetInventoryDeliveryVoucherAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/inventory-delivery-voucher/`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: {
          page_size: 1000,
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

export const CreateAInventoryDeliveryVoucherAPI = (
  token,
  stable_warehouse_id,
  destination_stable_warehouse_id,
  deliveryTime,
  reason,
  content,
  document_files,
  approve_user_id,
  supplies,
) => {
  return new Promise((resolve, reject) => {
    let formDataCreate = new FormData();
    formDataCreate.append('stable_warehouse_id', stable_warehouse_id ?? 0);
    formDataCreate.append(
      'destination_stable_warehouse_id',
      destination_stable_warehouse_id ?? 0,
    );
    formDataCreate.append('delivery_time', deliveryTime.toISOString() ?? '');
    formDataCreate.append('reason', reason ?? '');
    formDataCreate.append('content', content ?? '');
    for (let i = 0; i < document_files.length; i++) {
      let image = document_files[i];
      formDataCreate.append('document_files', {
        uri: image?.uri,
        name: getFileName(image),
        type: 'image/jpeg',
      });
    }
    formDataCreate.append('approve_user_id', approve_user_id ?? 0);
    formDataCreate.append('supplies', JSON.stringify(supplies) ?? '');
    axios
      .post(`${BASEURL}/api/v1/inventory-delivery-voucher/`, formDataCreate, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(function (error) {
        console.log(error, error?.response?.data);
        reject(error);
      });
  });
};

export const GetInventoryDeliveryVoucherByIDAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/inventory-delivery-voucher/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
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
export const UpdateAInventoryDeliveryVoucherAPI = (
  token,
  idUpdate,
  stable_warehouse_id,
  deliveryTime,
  reason,
  content,
  approve_user_id,
  supplies,
) => {
  return new Promise((resolve, reject) => {
    const formDataUpdate = new FormData();
    formDataUpdate.append('stable_warehouse_id', stable_warehouse_id ?? 0);
    formDataUpdate.append('delivery_time', deliveryTime ?? '');
    formDataUpdate.append('reason', reason ?? '');
    formDataUpdate.append('content', content ?? '');
    formDataUpdate.append('approve_user_id', approve_user_id ?? 0);
    formDataUpdate.append('supplies', JSON.stringify(supplies) ?? '');
    axios
      .put(
        `${BASEURL}/api/v1/inventory-delivery-voucher/${idUpdate}`,
        formDataUpdate,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => {
        resolve(res);
      })
      .catch(function (error) {
        console.log(error, error?.response?.data);
        reject(error);
      });
  });
};
export const ReceivingApproveInventoryDeliveryVoucher = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${BASEURL}/api/v1/inventory-delivery-voucher/${id}/receiving-approve`,
        id,
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
export const ReceivingRejectInventoryDeliveryVoucher = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${BASEURL}/api/v1/inventory-delivery-voucher/${id}/receiving-reject`,
        id,
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
export const ApproveInventoryDeliveryVoucher = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/inventory-delivery-voucher/${id}/approve`, id, {
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
export const RejectInventoryDeliveryVoucher = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/inventory-delivery-voucher/${id}/reject`, id, {
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
// Inventory Control Voucher
export const GetInventoryControlVoucherAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/inventory-control-voucher/`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: {
          page_size: 1000,
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
export const CreateAInventoryControlVoucherAPI = (
  token,
  stable_warehouse_id,
  forControlTime,
  reason,
  content,
  document_files,
  approve_user_id,
  supplies,
) => {
  return new Promise((resolve, reject) => {
    let formDataCreate = new FormData();
    formDataCreate.append('stable_warehouse_id', stable_warehouse_id ?? 0);
    formDataCreate.append(
      'for_control_time',
      forControlTime.toISOString() ?? '',
    );
    formDataCreate.append('reason', reason ?? '');
    formDataCreate.append('content', content ?? '');
    for (let i = 0; i < document_files.length; i++) {
      let image = document_files[i];
      formDataCreate.append('document_files', {
        uri: image?.uri,
        name: getFileName(image),
        type: 'image/jpeg',
      });
    }
    formDataCreate.append('approve_user_id', approve_user_id ?? 0);
    formDataCreate.append('supplies', JSON.stringify(supplies) ?? '');
    axios
      .post(`${BASEURL}/api/v1/inventory-control-voucher/`, formDataCreate, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(function (error) {
        console.log(error, error?.response?.data);
        reject(error);
      });
  });
};
export const GetInventoryControlVoucherByIDAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/inventory-control-voucher/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
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
export const UpdateAInventoryControlVoucherAPI = (
  token,
  idUpdate,
  stable_warehouse_id,
  forControlTime,
  reason,
  content,
  approve_user_id,
  supplies,
) => {
  return new Promise((resolve, reject) => {
    const formDataUpdate = new FormData();
    formDataUpdate.append('stable_warehouse_id', stable_warehouse_id ?? 0);
    formDataUpdate.append('for_control_time', forControlTime ?? '');
    formDataUpdate.append('reason', reason ?? '');
    formDataUpdate.append('content', content ?? '');
    formDataUpdate.append('approve_user_id', approve_user_id ?? 0);
    formDataUpdate.append('supplies', JSON.stringify(supplies) ?? '');
    axios
      .put(
        `${BASEURL}/api/v1/inventory-control-voucher/${idUpdate}`,
        formDataUpdate,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => {
        resolve(res);
      })
      .catch(function (error) {
        console.log(error, error?.response?.data);
        reject(error);
      });
  });
};
export const ApproveInventoryControlVoucher = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/inventory-control-voucher/${id}/approve`, id, {
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
export const RejectInventoryControlVoucher = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/inventory-control-voucher/${id}/reject`, id, {
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
