import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

function getFileName(file) {
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
}

function pickImageFromCamera(onSuccess, onFailure) {
  ImagePicker.openCamera({
    width: 1080,
    height: 1920,
  })
    .then(image => {
      onSuccess(image);
    })
    .catch(err => {
      if (err.code !== 'E_PICKER_CANCELLED') {
        console.log(err);
      }
      onFailure();
    });
}

function pickImageFromGallery(onSuccess, onFailure) {
  ImagePicker.openPicker({
    multiple: false,
    width: 1080,
    height: 1920,
    cropping: false,
  })
    .then(images => {
      onSuccess(images);
    })
    .catch(err => {
      if (err.code !== 'E_PICKER_CANCELLED') {
      }
      onFailure();
    });
}

function checkSizeImageChat(element) {
  if (!element?.size) {
    return false;
  }
  return element.size / 1024 / 1024 <= 8;
}

async function resizeImageNotVideo(image) {
  let convert = {};
  let isShowAlertImage = true;
  await ImageResizer.createResizedImage(image.path, 300, 400, 'PNG', 100)
    .then(response => {
      if (checkSizeImageChat(response)) {
        convert = {
          ...response,
          mime: image?.mime,
          type: image?.mime,
          uri:
            Platform.OS === 'ios' ? '/private' + response.path : response.uri,
        };
      } else if (isShowAlertImage) {
        isShowAlertImage = false;
      }
    })
    .catch(err => {
      console.log(err);
    });
  return convert;
}
function getFileNameFromPath(_path) {
  if (_path !== undefined && _path !== null) {
    return _path.replace(/^.*[\\\/]/, '');
  } else {
    return '';
  }
}
const postFileImg = name => {
  if (name == '') {
    return null;
  }
  const form = {
    uri: name,
    name: getFileNameFromPath(name),
    type: 'image/jpeg',
  };
  return form;
};

const common = {
  getFileNameFromPath,
  getFileName,
  pickImageFromCamera,
  pickImageFromGallery,
  resizeImageNotVideo,
  postFileImg,
};

export default common;
