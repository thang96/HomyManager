export const formatNumber = (value: any) => {
    let removeChar = value?.replace(/[^0-9\.]/g, '');
    let removerDot = removeChar?.replace(/\./g, '');
    let formatNumber = removerDot?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formatNumber;
  };
  export const validateNumber = (value: any) => {
    let removeChar = value?.replace(/[^0-9\.]/g, '');
    return removeChar;
  };
  export const convertDate = (value: any) => {
    let eachData = new Date(value);
    let result = dateToDMY(eachData);
    return result;
  };
  export const dateToYMD = (value: any) => {
    var d = value.getDate();
    var m = value.getMonth() + 1; //Month from 0 to 11
    var y = value.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  };
  export const dateToDMY = (value: any) => {
    var d = value.getDate();
    var m = value.getMonth() + 1; //Month from 0 to 11
    var y = value.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
  };
  
  export const getFileName = (file:any) => {
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
  
  export const checkSizeImageChat = (element:any) => {
    if (!element?.size) {
      return false;
    }
    return element.size / 1024 / 1024 <= 8;
  };
  
  export const getFileNameFromPath = (_path: any) => {
    if (_path !== undefined && _path !== null) {
      return _path.replace(/^.*[\\\/]/, '');
    } else {
      return '';
    }
  };
  export const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      })
      .replace(/-/g, '');
  };
  export const isImage = (url: string) => {
    url = url.toLowerCase();
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };
  