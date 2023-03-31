import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {useDispatch, useSelector} from 'react-redux';
import RenderImage from '../../Components/ComponentHome/RenderImage';
import CustomButton from '../../Components/CommonComponent/CustomButton';
import CustomTextTitle from '../../Components/CommonComponent/CustomTextTitle';
import CustomModalNotify from '../../Components/CommonComponent/CustomModalNotify';
import CustomInput from '../../Components/CommonComponent/CustomInput';
import {colors, icons, images} from '../../Constants';
import {updateUserInfor, userInfor} from '../../Store/slices/userInfoSlice';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../Components/CommonComponent/CustomModalCamera';
import CustomLoading from '../../Components/CommonComponent/CustomLoading';
import {uuid} from '../../utils/uuid';
import CustomModalDateTimePicker from '../../Components/CommonComponent/CustomModalDateTimePicker';
import {convertDate, dateToYMD} from '../../utils/common';
import {token} from '../../Store/slices/tokenSlice';
import CustomTwoButtonBottom from '../../Components/CommonComponent/CustomTwoButtonBottom';
import {GetUserAPi, PutUserAPi} from '../../Api/User/UserApis';
import {useCallback} from 'react';
import {
  DeleteImageApi,
  PostImageUserApi,
} from '../../Api/Home/FileDataApis/FileDataApis';
import {PostImageIdentityApi} from '../../Api/Home/FileDataApis/FileDataApis';
import {updateStatus} from '../../Store/slices/statusSlice';
const EditAccount = props => {
  const dispatch = useDispatch();

  const tokenStore = useSelector(token);
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [birthDay, setBirthDay] = useState(new Date());
  const [identityIssueDate, setIdentityIssueDate] = useState(new Date());
  const [albumImage, setAlbumImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalCameraAvatar, setModalCameraAvatar] = useState(false);
  const [modalBirthDay, setModalBirthDay] = useState(false);
  const [modaSaveAccount, setModaSaveAccount] = useState(false);
  const [modalIdentityIssueDate, setModalIdentityIssueDate] = useState(false);
  // console.log(user);
  useEffect(() => {
    loadingData();
  }, []);

  const loadingData = async () => {
    await GetUserAPi(tokenStore)
      .then(res => {
        if (res?.status == 200) {
          setUser(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  const openCameraAvatar = () => {
    const avatarId = user?.avatarImage?.id;
    setModalCameraAvatar(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(async image => {
        let eachImg = {...image, uri: image?.path};
        let avatarImage = [{...eachImg}];
        if (avatarId) {
          deleteImage(avatarId).then(() => {
            updateAvatarImage(avatarImage);
          });
        } else {
          updateAvatarImage(avatarImage);
        }
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCameraAvatar(false);
      });
  };
  const openGalleryAvatar = () => {
    const avatarId = user?.avatarImage?.id;
    setModalCameraAvatar(false);
    ImagePicker.openPicker({multiple: false})
      .then(async image => {
        let eachImg = {...image, uri: image?.path};
        let avatarImage = [{...eachImg}];
        if (avatarId) {
          deleteImage(avatarId).then(() => {
            updateAvatarImage(avatarImage);
          });
        } else {
          updateAvatarImage(avatarImage);
        }
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCameraAvatar(false);
      });
  };

  const updateAvatarImage = async avatarImage => {
    setLoading(true);
    await PostImageUserApi(tokenStore, user?.id, avatarImage)
      .then(res => {
        if (res?.status == 200) {
          loadingData();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const openCamera = () => {
    setModalCamera(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        let newAlbumImg = [...albumImage, eachImg];
        setAlbumImage(newAlbumImg);
        let eachResult = [...user?.identityImages, eachImg];
        let newUser = {...user, identityImages: eachResult};
        setUser(newUser);
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
        image.forEach(element => {
          let eachElement = {...element, uri: element?.path};
          albumImg.push(eachElement);
        });
        let eachAlbumImg = [...albumImage];
        let newAlbumImg = eachAlbumImg.concat(albumImg);
        setAlbumImage(newAlbumImg);
        const eachResult = [...user?.identityImages];
        const newResult = eachResult.concat(albumImg);
        let newUser = {...user, identityImages: newResult};
        setUser(newUser);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const renderImage = (item, index) => {
    return (
      <RenderImage
        data={item}
        deleteButton={true}
        deleteItem={() => {
          if (item?.id) {
            Alert.alert(
              'Cảnh báo !',
              'Đây là ảnh đang có trên server, bạn có muốn xóa ?',
              [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'OK',
                  onPress: () => {
                    let result = [...user?.identityImages];
                    let newResult = result.filter(
                      itemResult => itemResult !== item,
                    );
                    let newUser = {...user, identityImages: newResult};
                    setUser(newUser);
                    deleteImage(item?.id);
                  },
                },
              ],
            );
          } else {
            let eachAlbumImg = [...albumImage];
            let newAlbumImg = eachAlbumImg.filter(
              itemResult => itemResult !== item,
            );
            setAlbumImage(newAlbumImg);
            let result = [...user?.identityImages];
            let newResult = result.filter(itemResult => itemResult !== item);
            let newUser = {...user, identityImages: newResult};
            setUser(newUser);
          }
        }}
      />
    );
  };
  const deleteImage = async imageId => {
    setLoading(true);
    await DeleteImageApi(tokenStore, imageId)
      .then(res => {
        if (res?.status == 200) {
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const updateInforAcoount = async () => {
    setModaSaveAccount(false);
    setLoading(true);
    let data = {
      fullName: `${user?.fullName}` ?? '',
      phoneNumber: `${user?.phoneNumber}` ?? '',
      email: `${user?.email}` ?? '',
      birthDay: `${user?.birthDay}` ?? '',
      identityNumber: `${user?.identityNumber}` ?? '',
      identityIssueDate: `${user?.identityIssueDate}` ?? '',
      identityIssuePlace: `${user?.identityIssuePlace}` ?? '',
      address: `${user?.address}` ?? '',
    };
    await PutUserAPi(tokenStore, data)
      .then(async res => {
        if (res?.status == 200) {
          if (albumImage?.length > 0) {
            await PostImageIdentityApi(tokenStore, user?.id, albumImage)
              .then(res => {
                if (res?.status == 200) {
                  dispatch(updateStatus(false));
                  setLoading(true);
                  navigation.goBack();
                }
              })
              .catch(error => {
                console.log(error, 'error post img');
              });
          } else {
            dispatch(updateStatus(false));
            setLoading(true);
            navigation.goBack();
          }
        }
      })
      .catch(error => {
        console.log(error, 'error put');
      });
  };

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      {modaSaveAccount && (
        <CustomModalNotify
          title={'cập nhật thông tin'}
          label={'Bạn có muốn cập nhật thông tin account này ?'}
          onRequestClose={() => setModaSaveAccount(false)}
          pressConfirm={() => updateInforAcoount()}
        />
      )}
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
      {modalBirthDay && (
        <CustomModalDateTimePicker
          onCancel={() => setModalBirthDay(false)}
          value={birthDay}
          mode={'date'}
          onDateChange={value => {
            let newUser = {...user, birthDay: dateToYMD(value)};
            setUser(newUser);
            setBirthDay(value);
          }}
          onPress={() => setModalBirthDay(false)}
        />
      )}
      {modalIdentityIssueDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalIdentityIssueDate(false)}
          value={identityIssueDate}
          mode={'date'}
          onDateChange={value => {
            let newUser = {...user, identityIssueDate: dateToYMD(value)};
            setUser(newUser);
            setIdentityIssueDate(value);
          }}
          onPress={() => setModalIdentityIssueDate(false)}
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
          {user?.avatarImage?.fileUrl ? (
            <Image
              source={{uri: user?.avatarImage?.fileUrl}}
              style={styles.avatar}
              resizeMode="contain"
            />
          ) : user?.avatarImage?.uri ? (
            <Image
              source={{uri: user?.avatarImage?.uri}}
              style={styles.avatar}
              resizeMode="contain"
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
          keyboardType={'numeric'}
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
          value={`${convertDate(user?.birthDay)}`}
          onPress={() => setModalBirthDay(true)}
        />
        <CustomInput
          type={'input'}
          title={'Số CMND/CCCD'}
          styleViewInput={{marginTop: 10}}
          styleInput={{backgroundColor: '#EBEDEE'}}
          placeholder={'Nhập số CMND/CCCD'}
          keyboardType={'numeric'}
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
          value={`${convertDate(user?.identityIssueDate)}`}
          onPress={() => setModalIdentityIssueDate(true)}
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
          {user?.identityImages?.length > 0 ? (
            <FlatList
              listKey="imageCMND-CCCD"
              horizontal
              data={user?.identityImages}
              keyExtractor={(key, index) => `key${index.toString()}`}
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
      <CustomTwoButtonBottom
        leftLabel={'Hủy'}
        rightLabel={'Lưu'}
        styleLabelLeft={styles.styleLabelLeft}
        styleButtonLeft={styles.styleButtonLeft}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => setModaSaveAccount(true)}
      />
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
  styleLabelLeft: {color: 'orange', fontSize: 15, fontWeight: '600'},
  styleButtonLeft: {
    borderColor: 'orange',
    backgroundColor: 'white',
    marginRight: 5,
  },
});
export default EditAccount;
