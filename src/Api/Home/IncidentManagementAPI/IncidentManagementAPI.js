import axios from 'axios';
import {BASEURL} from '../../BASEURL';

const GetListIssuesAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/issues/`, {
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
const GetListReportsIssuesAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/issues/`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          optical_cable_id: id,
          issue_status_code: 'COMPLETION',
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

const CreateIssuesRequestAPI = (
  token,
  descriptionS,
  optical_cable_id,
  user_assigned_id,
  document_files,
) => {
  return new Promise((resolve, reject) => {
    const formDataCreate = new FormData();
    formDataCreate.append('description', descriptionS ?? '');
    formDataCreate.append('optical_cable_id', optical_cable_id ?? 0);
    formDataCreate.append('user_assigned_id', user_assigned_id ?? 0);
    for (let i = 0; i < document_files.length; i++) {
      let image = document_files[i];
      formDataCreate.append('document_files', {
        uri: image?.uri,
        name: getFileName(image),
        type: 'image/jpeg',
      });
    }
    axios
      .post(`${BASEURL}/api/v1/issues/`, formDataCreate, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
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
const UpdateIssuesRequestAPI = (
  token,
  idUpdate,
  descriptionS,
  optical_cable_id,
  user_assigned_id,
  document_files,
) => {
  return new Promise((resolve, reject) => {
    const formDataCreate = new FormData();
    formDataCreate.append('description', descriptionS ?? '');
    formDataCreate.append('optical_cable_id', optical_cable_id ?? 0);
    formDataCreate.append('user_assigned_id', user_assigned_id ?? 0);

    axios
      .put(`${BASEURL}/api/v1/issues/`, formDataCreate, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        params: {
          id: idUpdate,
        },
      })
      .then(res => {
        resolve(res);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const GetIncidentIssueByIdAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/issues/${id}`, {
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
const DeleteIncidentIssueByIdAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASEURL}/api/v1/issues/${id}`, {
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

const ReceiveIssueAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/issues/${id}/receive`, id, {
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

const RejectIssueAPI = (token, id) => {
  const formData = new FormData();
  formData.append('id', parseInt(id) ?? 0);
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/issues/${id}/reject`, formData, {
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

const AcceptIssueRequestAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASEURL}/api/v1/issues/${id}/accept`, null, {
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

const DetailIssueReportAPI = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/issues/${id}/issue_report`, {
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

const IssueReportAPI = (
  token,
  issueId,
  locationLongitude,
  locationLatitude,
  reason,
  solution,
  reportDocument,
  supplies,
) => {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append('location_longitude', locationLongitude ?? '');
    formData.append('location_latitude', locationLatitude ?? '');
    formData.append('reason', reason ?? '');
    formData.append('solution', solution ?? '');
    for (let i = 0; i < reportDocument.length; i++) {
      let image = reportDocument[i];
      formData.append('document_files', {
        uri: image?.uri,
        name: getFileName(image),
        type: 'image/jpeg',
      });
    }
    formData.append('supplies', JSON.stringify(supplies) ?? '');
    axios
      .post(`${BASEURL}/api/v1/issues/${issueId}/issue_report`, formData, {
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
const ExportIssueAPI = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASEURL}/api/v1/issues/export/`, {
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

const IncidentManagementAPI = {
  GetListIssuesAPI,
  GetListReportsIssuesAPI,
  CreateIssuesRequestAPI,
  UpdateIssuesRequestAPI,
  GetIncidentIssueByIdAPI,
  DeleteIncidentIssueByIdAPI,
  ReceiveIssueAPI,
  RejectIssueAPI,
  AcceptIssueRequestAPI,
  DetailIssueReportAPI,
  IssueReportAPI,
  ExportIssueAPI,
};
export default IncidentManagementAPI;
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
