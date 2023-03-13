import axios from 'axios';
import {BASEURL} from '../../BASEURL';

export const GetListHausesApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/houses`, {
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

export const HauseDetailApi = (token, hauseId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/houses/${hauseId}`, {
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

export const GetLocationCitysApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/locations/cities`, {
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

export const GetDistrictByCityIdApi = (token, cityId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/locations/cites/${cityId}/districts`, {
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

export const GetWardByDistrictIdApi = (token, districtId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/locations/districts/${districtId}/wards`, {
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

export const CreateNewBuildingApi = (token, data) => {
  let eachData = {
    name: data?.name,
    numberOfFloor: data?.numberOfFloor,
    openTime: data?.openTime,
    closeTime: data?.closeTime,
    leasingFee: parseInt(data?.leasingFee),
    description: data?.description,
    billingDate: parseInt(data?.billingDate),
    paymentDateFrom: parseInt(data?.paymentDateFrom),
    paymentDateTo: parseInt(data?.paymentDateTo),
    notice: data?.notice,
    billNotice: data?.billNotice,
    address: data?.address,
    organizationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    cityId: data?.cityId,
    districtId: data?.districtId,
    wardId: data?.wardId,
    serviceIds: data?.serviceIds,
    amenityIds: data?.amenityIds,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/houses`, data, {
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
