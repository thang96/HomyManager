export const formatNumber = value => {
  let removeChar = value?.replace(/[^0-9\.]/g, '');
  let removerDot = removeChar?.replace(/\./g, '');
  let formatNumber = removerDot?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formatNumber;
};
export const validateNumber = value => {
  let removeChar = value?.replace(/[^0-9\.]/g, '');
  return removeChar;
};
export const convertDate = value => {
  var d = new Date(value);
  var convertDate = dateToDMY(d);
  return convertDate;
};
export const convertTime = value => {
  var d = new Date(value);
  var convertDate = d.toLocaleTimeString('en-VN');
  return convertDate;
};
export const dateToYMD = value => {
  var d = value.getDate();
  var m = value.getMonth() + 1; //Month from 0 to 11
  var y = value.getFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
};
export const dateToDMY = value => {
  var d = value.getDate();
  var m = value.getMonth() + 1; //Month from 0 to 11
  var y = value.getFullYear();
  return '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
};

export const getFileName = file => {
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

export const checkSizeImageChat = element => {
  if (!element?.size) {
    return false;
  }
  return element.size / 1024 / 1024 <= 8;
};

export const getFileNameFromPath = _path => {
  if (_path !== undefined && _path !== null) {
    return _path.replace(/^.*[\\\/]/, '');
  } else {
    return '';
  }
};
