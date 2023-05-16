import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Alert, ScrollView} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import {colors, icons, images} from '../../../Constants';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomModalDateTimePicker from '../../../Components/CommonComponent/CustomModalDateTimePicker';
import {dateToDMY, dateToYMD} from '../../../utils/common';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {
  CreateNewManagerApi,
  GetListManagersApi,
} from '../../../Api/Home/ManagerApis/ManagerApis';
import {updateManagers} from '../../../Store/slices/commonSlice';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import ComponentInput from '../../../Components/CommonComponent/ComponentInput';
import ComponentButton from '../../../Components/CommonComponent/ComponentButton';
import {StraightLine} from '../../../Components/CommonComponent/LineComponent';

const AddNewManager = () => {
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const dispatch = useDispatch();
  const [loadingManager, setLoadingManager] = useState(false);
  const [modalManager, setModalManager] = useState(false);

  const [timeNow, setTimeNow] = useState(new Date());
  const [timeNowIssueDate, setTimeNowIssueDate] = useState(new Date());
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [identityIssueDate, setIdentityIssueDate] = useState('');
  const [identityIssuePlace, setIdentityIssuePlace] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

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

  const createNewManager = async () => {
    setLoadingManager(true);
    let data = {
      userName: phoneNumber,
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      birthDay: `${birthDay}`,
      identityNumber: identityNumber,
      identityIssueDate: `${identityIssueDate}`,
      identityIssuePlace: identityIssuePlace,
      address: address,
      password: '',
    };
    await CreateNewManagerApi(tokenStore, data)
      .then(async res => {
        if (res?.status == 200) {
          await GetListManagersApi(tokenStore)
            .then(res => {
              if (res?.status == 200) {
                let eachManager = res?.data;
                let newData = [];
                eachManager.map((item, index) => {
                  newData.push({...item, isCheck: false});
                });
                dispatch(updateManagers(newData));
                setLoadingManager(false);
                navigation.goBack();
              }
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loadingManager && <CustomLoading />}
      {modalManager && (
        <CustomModalNotify
          title={'Tạo mới quản lý'}
          label={'Bạn có muốn thêm mới người quản lý tòa nhà này ?'}
          modalVisible={modalManager}
          onRequestClose={() => setModalManager(false)}
          pressConfirm={() => createNewManager()}
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
          value={timeNow}
          mode={'date'}
          onDateChange={value => {
            setTimeNow(value);
            let eachBirthDay = dateToYMD(value);
            let newTime = dateToDMY(value);
            setBirthDay(eachBirthDay);
            setBirthDayValue(newTime);
          }}
          onPress={() => setModalBirthDay(false)}
        />
      )}
      {modalIdentityIssueDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalIdentityIssueDate(false)}
          value={timeNowIssueDate}
          mode={'date'}
          onDateChange={value => {
            setTimeNowIssueDate(value);
            let eachIssueDate = dateToYMD(value);
            let newTime = dateToDMY(value);
            setIdentityIssueDate(eachIssueDate);
            setIdentityIssueDateValue(newTime);
          }}
          onPress={() => setModalIdentityIssueDate(false)}
        />
      )}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Thêm người quản lý'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, paddingTop: 10}}>
        <CustomSuggest
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />
        <CustomTextTitle label={'Thông tin người quản lý'} />
        <ComponentInput
          type={'input'}
          title={'Số điện thoại'}
          placeholder={'Nhập số điện thoại'}
          keyboardType={'number-pad'}
          important={true}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <ComponentInput
          type={'input'}
          viewComponent={{marginTop: 10}}
          title={'Họ và tên'}
          placeholder="Nhập họ và tên"
          keyboardType={'number-pad'}
          important={true}
          value={fullName}
          onChangeText={text => setFullName(text)}
        />
        <ComponentInput
          type={'input'}
          viewComponent={{marginTop: 10}}
          title={'Email'}
          placeholder="Nhập email"
          keyboardType={'number-pad'}
          important={true}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <ComponentInput
          type={'input'}
          viewComponent={{marginTop: 10}}
          title={'Email'}
          placeholder="Nhập email"
          keyboardType={'number-pad'}
          important={true}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <ComponentButton
          type={'buttonSelect'}
          viewComponent={{marginTop: 10}}
          title={'Ngày sinh'}
          placeholder={'Chọn ngày sinh'}
          value={birthDayValue}
          onPress={() => setModalBirthDay(true)}
        />
        <ComponentInput
          type={'input'}
          viewComponent={{marginTop: 10}}
          title={'Số CMND/ CCCD'}
          placeholder={'Nhập số CMND/ CCCD'}
          keyboardType={'number-pad'}
          important={true}
          value={identityNumber}
          onChangeText={text => setIdentityNumber(text)}
        />
        <ComponentButton
          type={'buttonSelect'}
          viewComponent={{marginTop: 10}}
          title={'Ngày cấp'}
          placeholder={'Chọn ngày cấp'}
          value={identityIssueDateValue}
          onPress={() => setModalBirsetModalIdentityIssueDatethDay(true)}
        />
        <ComponentInput
          type={'input'}
          viewComponent={{marginTop: 10}}
          title={'Nơi cấp'}
          placeholder={'Nhập nơi cấp'}
          important={true}
          value={identityIssuePlace}
          onChangeText={text => setIdentityIssuePlace(text)}
        />
        <ComponentInput
          type={'input'}
          viewComponent={{marginTop: 10}}
          title={'Địa chỉ'}
          placeholder={'Nhập địa chỉ'}
          important={true}
          value={address}
          onChangeText={text => setAddress(text)}
        />
        {StraightLine()}
        <ComponentRenderImage
          title={'Thêm ảnh CMND/ CCCD'}
          label={'Tải lên ảnh mặt trước và mặt sau của CMND/ CCCD'}
          labelUpload={'Thêm ảnh CMND/ CCCD'}
          data={albumImage}
          deleteButton={true}
          openModal={() => setModalCamera(true)}
          deleteItem={item => {
            let result = [...albumImage];
            let newResult = result.filter(itemResult => itemResult !== item);
            setAlbumImage(newResult);
          }}
        />

        <View style={{height: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Lưu'}
          rightLabel={'Thêm mới'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => setModalManager(true)}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({});
export default AddNewManager;
