import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {useSelector} from 'react-redux';
import CustomButton from '../../Components/CommonComponent/CustomButton';
import CustomTextTitle from '../../Components/CommonComponent/CustomTextTitle';
import CustomInput from '../../Components/CommonComponent/CustomInput';
import {colors, icons, images} from '../../Constants';
import {userInfor} from '../../Store/slices/userInfoSlice';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../Components/CommonComponent/CustomModalCamera';
import CustomLoading from '../../Components/CommonComponent/CustomLoading';
import {uuid} from '../../utils/uuid';
const EditAccount = props => {
  const userStore = useSelector(userInfor);
  const navigation = useNavigation();
  const [user, setUser] = useState(userStore);
  const [albumImage, setAlbumImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalCameraAvatar, setModalCameraAvatar] = useState(false);

  const openCameraAvatar = () => {
    setModalCameraAvatar(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        let newUser = {...user, avatarImage: eachImg};
        setUser(newUser);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCameraAvatar(false);
      });
  };
  const openGalleryAvatar = () => {
    setModalCameraAvatar(false);
    ImagePicker.openPicker({multiple: false})
      .then(async image => {
        let eachImg = {...image, uri: image?.path};
        let newUser = {...user, avatarImage: eachImg};
        setUser(newUser);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCameraAvatar(false);
      });
  };
  const openCamera = () => {
    setModalCamera(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        const eachResult = [...albumImage, eachImg];
        setAlbumImage(eachResult);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };
  const openGallery = () => {
    setModalCamera(false);
    ImagePicker.openPicker({multiple: true})
      .then(async image => {
        let albumImg = [];
        for (let index = 0; index < image.length; index++) {
          let element = image[index];
          let eachElement = {...element, uri: element?.path};
          albumImg.push(eachElement);
        }
        const eachResult = [...albumImage];
        const newResult = eachResult.concat(albumImg);
        setAlbumImage(newResult);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const renderImage = (item, index) => {
    return (
      <View>
        <View style={styles.viewRender}>
          <CustomButton
            onPress={() => {
              let result = [...albumImage];
              let newResult = result.filter(itemResult => itemResult !== item);
              setAlbumImage(newResult);
            }}
            styleButton={styles.customButtonIcon}
            styleIcon={styles.imageStyle}
            icon={icons.ic_cancel}
          />
          <Image
            source={{uri: item?.uri}}
            style={{width: 180, height: 180, marginHorizontal: 5}}
            resizeMode={'contain'}
          />
        </View>
      </View>
    );
  };
  // console.log(user?.avatarImage);
  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      {modalCameraAvatar && (
        <CustomModalCamera
          openCamera={() => openCameraAvatar()}
          openGallery={() => openGalleryAvatar()}
          modalVisible={modalCameraAvatar}
          onRequestClose={() => setModalCameraAvatar(false)}
          cancel={() => setModalCameraAvatar(false)}
        />
      )}
      {modalCamera && (
        <CustomModalCamera
          openCamera={() => openCamera()}
          openGallery={() => openGallery()}
          modalVisible={modalCamera}
          onRequestClose={() => setModalCamera(false)}
          cancel={() => setModalCamera(false)}
        />
      )}
      <ImageBackground
        source={images.im_backgroundAccount}
        style={{height: 160, width: '100%'}}>
        <CustomButton
          styleButton={styles.styleButton}
          icon={icons.ic_back}
          styleIcon={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <TouchableOpacity
          onPress={() => setModalCameraAvatar(true)}
          style={[styles.viewCenter, styles.viewAvatar]}>
          {user?.avatarImage.uri ? (
            <Image
              source={{uri: user?.avatarImage?.uri}}
              style={styles.avatar}
            />
          ) : (
            <Image source={icons.ic_user} style={styles.avatar} />
          )}
        </TouchableOpacity>
      </ImageBackground>
      <ScrollView style={{paddingHorizontal: 10, marginTop: 40}}>
        <CustomTextTitle label={'Tài khoản'} />
        <CustomInput
          type={'input'}
          title={'Họ và tên'}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập họ và tên'}
          defaultValue={user?.fullName}
          onEndEditing={evt => {
            let newUser = {...user, fullName: evt.nativeEvent.text};
            setUser(newUser);
          }}
        />
        <CustomInput
          type={'input'}
          title={'Số điện thoại'}
          styleViewInput={{marginTop: 10}}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập số điện thoại'}
          defaultValue={user?.phoneNumber}
          onEndEditing={evt => {
            let newUser = {...user, phoneNumber: evt.nativeEvent.text};
            setUser(newUser);
          }}
        />
        <CustomInput
          type={'input'}
          title={'Email'}
          styleViewInput={{marginTop: 10}}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập email'}
          defaultValue={user?.email}
          onEndEditing={evt => {
            let newUser = {...user, email: evt.nativeEvent.text};
            setUser(newUser);
          }}
        />
        <CustomTextTitle label={'Thông tin cá nhân'} />
        <CustomInput
          type={'button'}
          title={'Ngày sinh'}
          placeholder={'Chọn ngày sinh'}
          styleButton={{backgroundColor: '#EBEDEE'}}
          value={user?.birthDay}
          onPress={() => {}}
        />
        <CustomInput
          type={'input'}
          title={'Số CMND/CCCD'}
          styleViewInput={{marginTop: 10}}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập số CMND/CCCD'}
          defaultValue={user?.identityNumber}
          onEndEditing={evt => {
            let newUser = {...user, identityNumber: evt.nativeEvent.text};
            setUser(newUser);
          }}
        />
        <CustomInput
          type={'button'}
          title={'Ngày cấp'}
          placeholder={'Chọn ngày cấp'}
          styleViewInput={{marginTop: 10}}
          styleButton={{backgroundColor: '#EBEDEE'}}
          value={user?.identityIssueDate}
          onPress={() => {}}
        />
        <CustomInput
          type={'input'}
          title={'Nơi cấp'}
          styleViewInput={{marginTop: 10}}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập nơi cấp'}
          defaultValue={user?.identityIssuePlace}
          onEndEditing={evt => {
            let newUser = {...user, identityIssuePlace: evt.nativeEvent.text};
            setUser(newUser);
          }}
        />
        <CustomInput
          type={'input'}
          title={'Địa chỉ'}
          styleViewInput={{marginTop: 10}}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập địa chỉ'}
          defaultValue={user?.address}
          onEndEditing={evt => {
            let newUser = {...user, address: evt.nativeEvent.text};
            setUser(newUser);
          }}
        />
        <CustomTextTitle label={'Thêm ảnh CMND/ CCCD'} />

        <View style={styles.viewShowImage}>
          {albumImage.length > 0 ? (
            <FlatList
              listKey="imageCMND-CCCD"
              horizontal
              data={albumImage}
              keyExtractor={uuid}
              renderItem={({item}) => renderImage(item)}
            />
          ) : (
            <CustomButton
              styleButton={{flex: 1}}
              label={'Tải lên ảnh mặt trước và mặt sau của CMND/ CCCD'}
              styleLabel={[{marginTop: 5, textAlign: 'center'}]}
              disabled={true}
              icon={icons.ic_upload}
              styleIcon={{with: 100, height: 100, alignSelf: 'center'}}
            />
          )}
        </View>
        <CustomButton
          styleButton={[styles.buttonUploadIM]}
          label={'Thêm ảnh CMND/ CCCD'}
          styleLabel={styles.labelUploadIM}
          onPress={() => setModalCamera(true)}
        />
        <View style={{height: 56}} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  icon: {width: 24, height: 24, tintColor: 'white'},
  styleButton: {height: 56, width: 56},
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
  },
  viewCenter: {justifyContent: 'center', alignItems: 'center'},
  viewAvatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -30,
  },
  viewShowImage: {
    height: 220,
    marginVertical: 3,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  buttonUploadIM: {
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 10,
  },
  labelUploadIM: {color: 'white', fontWeight: '500', fontSize: 15},
  customButtonIcon: {position: 'absolute', right: 3, top: 3, zIndex: 1},
  imageStyle: {width: 20, height: 20},
  viewRender: {
    height: 210,
    width: 210,
    borderWidth: 0.5,
    borderColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
});
export default EditAccount;
