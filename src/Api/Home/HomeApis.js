import axios from 'axios';
import {BASEURL} from '../BASEURL';

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
      .get(`${BASEURL}/house/${hauseId}`, {
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
export const GetServicesApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/services`, {
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

export const GetAmenitysApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/amenities`, {
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

export const CreateBuildingApi = (token, data) => {
  return new Promise((resolve, reject) => {
    console.log(data);
    // axios
    //   .post(`${BASEURL}/amenities`, data, {
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then(res => {
    //     resolve(res);
    //   })
    //   .catch(errors => {
    //     reject(errors);
    //   });
  });
};
