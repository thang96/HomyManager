import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const GetAllHauseApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/house`, {
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

export const GetAllCityApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/locations/city`, {
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
      .get(`${BASEURL}/locations/city/${cityId}/district?name=`, {
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

export const GetWardByCityIdApi = (token, districtId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/locations/district/${districtId}/ward?name=`, {
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
export const GetServiceApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/service`, {
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

export const GetAmenityApi = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/amenity`, {
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
