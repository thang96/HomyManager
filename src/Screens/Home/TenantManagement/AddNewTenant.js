import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  Image,
  TouchableOpacity,
  Dimensions,
  SectionList,
} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {uuid} from '../../../utils/uuid';
import CustomInput from '../../../Components/CommonComponent/CustomInput';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomModalDateTimePicker from '../../../Components/CommonComponent/CustomModalDateTimePicker';
import {dateToYMD} from '../../../utils/common';

const AddNewTenant = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [birthDay, setBirthDay] = useState(new Date());
  const [identityNumber, setIdentityNumber] = useState('');
  const [identityIssueDate, setIdentityIssueDate] = useState(new Date());
  const [identityIssuePlace, setIdentityIssuePlace] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  console.log(`${birthDay}`);

  const [albumImage, setAlbumImage] = useState([]);

  const [modalCamera, setModalCamera] = useState(false);
  const [birthDayValue, setBirthDayValue] = useState('');
  const [modalBirthDay, setModalBirthDay] = useState(false);
  const [identityIssueDateValue, setIdentityIssueDateValue] = useState('');
  const [modalIdentityIssueDate, setModalIdentityIssueDate] = useState(false);

  const openCamera = () => {
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        addResult(eachImg);
        setModalCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const openGallery = () => {
    ImagePicker.openPicker({multiple: true})
      .then(async image => {
        let albumImg = [];
        for (let index = 0; index < image.length; index++) {
          let element = image[index];
          let eachElement = {...element, uri: element?.path};
          albumImg.push(eachElement);
        }
        addResultGallery(albumImg);
        setModalCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const addResultGallery = album => {
    const eachResult = [...albumImage];
    const newResult = eachResult.concat(album);
    setAlbumImage(newResult);
  };
  const addResult = image => {
    const eachResult = [...albumImage, image];
    setAlbumImage(eachResult);
  };

  const renderImage = (item, index) => {
    return (
      <View>
        <View style={styles.viewRender}>
          <CustomButton
            onPress={() => deleteItem(item, index)}
            styleButton={styles.customButtonIcon}
            styleIcon={styles.imageStyle}
            icon={icons.ic_circle}
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
  const deleteItem = (item, index) => {
    let result = [...albumImage];
    let newResult = result.filter(itemResult => itemResult !== item);

    setAlbumImage(newResult);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
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
            let newTime = dateToYMD(value);
            setBirthDay(value);
            setBirthDayValue(newTime);
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
            let newTime = dateToYMD(value);
            setIdentityIssueDate(value);
            setIdentityIssueDateValue(newTime);
          }}
          onPress={() => setModalIdentityIssueDate(false)}
        />
      )}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Thêm người thuê'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <CustomSuggest
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />
        <CustomTextTitle label={'Thông tin người thuê'} />

        <CustomInput
          type={'input'}
          title={'Số điện thoại'}
          placeholder={'Nhập số điện thoại'}
          keyboardType={'numeric'}
          important={true}
          defaultValue={phoneNumber}
          onEndEditing={evt => setPhoneNumber(evt.nativeEvent.text)}
        />

        <CustomInput
          type={'input'}
          styleViewInput={{marginTop: 20}}
          title={'Họ và tên'}
          placeholder="Nhập họ và tên"
          defaultValue={userName}
          onEndEditing={evt => setUserName(evt.nativeEvent.text)}
        />

        <CustomInput
          type={'input'}
          styleViewInput={{marginTop: 20}}
          title={'Email'}
          defaultValue={email}
          onEndEditing={evt => setEmail(evt.nativeEvent.text)}
        />

        <CustomInput
          type={'button'}
          styleViewInput={{marginTop: 20}}
          title={'Ngày sinh'}
          placeholder={'Chọn ngày sinh'}
          value={birthDayValue}
          onPress={() => setModalBirthDay(true)}
        />

        <CustomInput
          type={'input'}
          styleViewInput={{marginTop: 20}}
          title={'Số CMND/ CCCD'}
          placeholder={'Nhập số CMND/ CCCD'}
          keyboardType={'numeric'}
          defaultValue={userName}
          onEndEditing={evt => setUserName(evt.nativeEvent.text)}
        />

        <CustomInput
          type={'button'}
          styleViewInput={{marginTop: 20}}
          title={'Ngày cấp'}
          placeholder={'Chọn ngày cấp'}
          value={identityIssueDateValue}
          onPress={() => setModalIdentityIssueDate(true)}
        />

        <CustomInput
          type={'input'}
          styleViewInput={{marginTop: 20}}
          title={'Nơi cấp'}
          placeholder={'Nhập nơi cấp'}
        />

        <CustomInput
          type={'input'}
          styleViewInput={{marginTop: 20}}
          title={'Địa chỉ'}
          placeholder={'Nhập địa chỉ'}
        />

        <View style={styles.line} />

        <CustomTextTitle label={'Thêm ảnh CMND/ CCCD'} />

        <View style={styles.viewShowImage}>
          {albumImage.length > 0 ? (
            <FlatList
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
      <CustomTwoButtonBottom
        leftLabel={'Lưu'}
        rightLabel={'Thêm mới'}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => {
          console.log('Ok');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textTitle: {color: '#173b5f', fontSize: 16, fontWeight: 'bold'},
  label: {fontSize: 15, color: 'black', fontWeight: '500'},
  viewtextInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    paddingHorizontal: 10,
    backgroundColor: '#f8f9f9',
  },
  line: {
    height: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'black',
    marginVertical: 20,
  },
  buttonUploadIM: {
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 10,
  },
  labelUploadIM: {color: 'white', fontWeight: '500', fontSize: 15},
  customButtonIcon: {position: 'absolute', right: 3, top: 3, zIndex: 1},
  imageStyle: {width: 20, height: 20, tintColor: 'red'},
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
  viewShowImage: {
    height: 200,
    borderWidth: 0.5,
    borderColor: colors.mainColor,
    marginVertical: 5,
    borderRadius: 10,
  },
});
export default AddNewTenant;
