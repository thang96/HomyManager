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

export const PutBuildingApi = (token, data, houseId) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASEURL}/houses${houseId}`, data, {
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

export const DeleteBuildingApi = (token, houseId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/houses${houseId}`, data, {
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

export const PostImageBuildingApi = (token, hauseId, hauseImages) => {
  let formHause = new FormData();
  for (let i = 0; i < hauseImages.length; i++) {
    let image = hauseImages[i];
    formHause.append('files', {
      uri: image?.uri,
      name: getFileName(image),
      type: 'image/jpeg',
    });
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/houses/${hauseId}/files/upload`, formHause, {
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
