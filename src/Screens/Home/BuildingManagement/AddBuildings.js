import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
  Alert,
} from 'react-native';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import CustomModalDateTimePicker from '../../../Components/CommonComponent/CustomModalDateTimePicker';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import {uuid} from '../../../utils/uuid';
import CustomInput from '../../../Components/CommonComponent/CustomInput';
import CustomTimeButtons from '../../../Components/CommonComponent/CustomTimeButton';
import CustomStepAppBar from '../../../Components/CommonComponent/CustomStepAppBar';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomModalPicker from '../../../Components/CommonComponent/CustomModalPicker';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {ScrollView} from 'react-native-virtualized-view';
import {
  GetLocationCitysApi,
  GetDistrictByCityIdApi,
  GetWardByDistrictIdApi,
} from '../../../Api/Home/BuildingApis/BuildingApis';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {
  managerState,
  updateCommon,
  updateManagers,
} from '../../../Store/slices/commonSlice';
import {GetListManagersApi} from '../../../Api/Home/ManagerApis/ManagerApis';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import RenderImage from '../../../Components/ComponentHome/RenderImage';
import CustomInputValue from '../../../Components/CommonComponent/CustomInputValue';
import CustomNote from '../../../Components/CommonComponent/CustomNote';

const AddBuildings = props => {
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const managerRedux = useSelector(managerState);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [managerSelect, setManagerSelect] = useState([]);

  const [name, setName] = useState('');
  const [numberOfFloor, setNumberOfFloor] = useState('');
  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());
  const [leasingFee, setLeasingFee] = useState('');
  const [description, setDescription] = useState('');
  const [cityId, setCityId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [wardId, setWardId] = useState('');
  const [address, setAddress] = useState('');
  const [hauseImages, setHauseImages] = useState([]);

  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [cityName, setCityName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [wardName, setWardName] = useState('');

  const [openTimeValue, setOpenTimeValue] = useState('08:00:00');
  const [closeTimeValue, setCloseTimeValue] = useState('23:00:00');
  const [modalopenTime, setModalopenTime] = useState(false);
  const [modalcloseTime, setModalcloseTime] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalCity, setModalCity] = useState(false);
  const [modalDistrict, setModalDistrict] = useState(false);
  const [modalWard, setModalWard] = useState(false);

  useEffect(() => {
    let eachOpenTime = new Date('Sun Mar 12 2023 08:00:00 GMT+0700');
    let eachCloseTime = new Date('Sun Mar 12 2023 23:00:00 GMT+0700');
    setOpenTimeValue(eachOpenTime.toLocaleTimeString('en-VN'));
    setOpenTime(eachOpenTime);
    setCloseTimeValue(eachCloseTime.toLocaleTimeString('en-VN'));
    setCloseTime(eachCloseTime);
    const getData = async () => {
      await GetListManagersApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let eachManager = res?.data;
            let newData = [];
            eachManager.map((item, index) => {
              newData.push({...item, isCheck: false});
            });
            dispatch(updateManagers(newData));
            setLoading(false);
          }
        })
        .catch(error => console.log(error));

      await GetLocationCitysApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            setListCity(res?.data);
          }
        })
        .catch(error => console.log(error));
    };
    getData();
  }, [tokenStore]);

  useEffect(() => {
    let eachManager = [];
    for (let index = 0; index < managerRedux.length; index++) {
      const element = managerRedux[index];
      if (element?.isCheck == true) {
        eachManager.push(element);
      }
    }
    setManagerSelect(eachManager);
  }, [managerRedux]);

  const getDistrictData = async item => {
    setCityName(item?.name);
    setCityId(item?.id);
    setDistrictName('');
    setDistrictId('');
    setWardName('');
    setWardId('');
    setLoading(true);
    await GetDistrictByCityIdApi(tokenStore, item?.id)
      .then(res => {
        if (res?.status == 200) {
          setListDistrict(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  const getWardData = async item => {
    setDistrictName(item?.name);
    setDistrictId(item?.id);
    setWardName('');
    setWardId('');
    setLoading(true);
    await GetWardByDistrictIdApi(tokenStore, item?.id)
      .then(res => {
        if (res?.status == 200) {
          setListWard(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  const openCamera = () => {
    setModalCamera(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        const eachResult = [...hauseImages, eachImg];
        setHauseImages(eachResult);
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
        const eachResult = [...hauseImages];
        const newResult = eachResult.concat(albumImg);
        setHauseImages(newResult);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const renderImage = (item, index) => {
    return (
      <RenderImage
        deleteButton={true}
        data={item}
        deleteItem={() => {
          let result = [...hauseImages];
          let newResult = result.filter(itemResult => itemResult !== item);
          setHauseImages(newResult);
        }}
      />
    );
  };

  const goToStepTwo = () => {
    let data = {
      name: name,
      numberOfFloor: parseInt(numberOfFloor),
      openTime: `${openTime}`,
      closeTime: `${closeTime}`,
      leasingFee: parseInt(leasingFee),
      description: description,
      cityId: cityId,
      districtId: districtId,
      wardId: wardId,
      address: address,
      hauseImages: hauseImages,
    };
    if (name == '' && numberOfFloor == '') {
      Alert.alert(
        'Thiếu trường thông tin',
        'Vui lòng điền đầy đủ mục thông tin có dấu *',
      );
    } else {
      dispatch(updateCommon(data));
      navigation.navigate('AddBuildingsStep2');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading && <CustomLoading />}
      {modalCamera && (
        <CustomModalCamera
          openCamera={() => openCamera()}
          openGallery={() => openGallery()}
          modalVisible={modalCamera}
          onRequestClose={() => setModalCamera(false)}
          cancel={() => setModalCamera(false)}
        />
      )}
      {modalopenTime && (
        <CustomModalDateTimePicker
          onCancel={() => setModalopenTime(false)}
          value={openTime}
          mode={'time'}
          openPicker={modalopenTime}
          onDateChange={value => {
            let newTime = value.toLocaleTimeString('en-VN');
            setOpenTime(value);
            setOpenTimeValue(newTime);
          }}
          onPress={() => setModalopenTime(false)}
        />
      )}
      {modalcloseTime && (
        <CustomModalDateTimePicker
          onCancel={() => setModalcloseTime(false)}
          value={closeTime}
          mode={'time'}
          openPicker={modalcloseTime}
          onDateChange={value => {
            let newTime = value.toLocaleTimeString('en-VN');
            setCloseTime(value);
            setCloseTimeValue(newTime);
          }}
          onPress={() => setModalcloseTime(false)}
        />
      )}
      {modalCity && (
        <CustomModalPicker
          modalVisible={modalCity}
          data={listCity}
          pressClose={() => setModalCity(false)}
          onPressItem={item => {
            setModalCity(false);
            getDistrictData(item);
          }}
        />
      )}
      {modalDistrict && (
        <CustomModalPicker
          modalVisible={modalDistrict}
          data={listDistrict}
          pressClose={() => setModalDistrict(false)}
          onPressItem={item => {
            setModalDistrict(false);
            getWardData(item);
          }}
        />
      )}
      {modalWard && (
        <CustomModalPicker
          modalVisible={modalWard}
          data={listWard}
          pressClose={() => setModalWard(false)}
          onPressItem={item => {
            setWardName(item?.name);
            setWardId(item?.id);
            setModalWard(false);
          }}
        />
      )}
      <CustomStepAppBar
        iconLeft={icons.ic_back}
        label={'Thiết lập thông tin'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
        step={1}
      />

      <ScrollView style={[styles.eachContainer]}>
        <CustomSuggest
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />
        <CustomTextTitle label={'Thông tin tòa nhà'} />
        <CustomInput
          important={true}
          type={'input'}
          title={'Tên tòa nhà'}
          placeholder={'Nhập tên tòa nhà'}
          defaultValue={name}
          onEndEditing={evt => setName(evt.nativeEvent.text)}
        />
        <CustomInput
          important={true}
          keyboardType={'numeric'}
          type={'input'}
          styleViewInput={{marginTop: 10}}
          title={'Số tầng'}
          placeholder={'Nhập số tầng'}
          defaultValue={numberOfFloor}
          onEndEditing={evt => setNumberOfFloor(evt.nativeEvent.text)}
        />

        <CustomTimeButtons
          styleContainer={{marginTop: 10}}
          title={'Giờ mở - đóng cửa'}
          leftLabel={'Từ'}
          rightLabel={'Đến'}
          styleButtonLeft={{marginRight: 5}}
          styleButtonRight={{marginLeft: 5}}
          valueLeft={openTimeValue}
          valueRight={closeTimeValue}
          onPressLeft={() => setModalopenTime(true)}
          onPressRightt={() => setModalcloseTime(true)}
        />
        <CustomInputValue
          viewContainer={{marginTop: 10}}
          type={'input'}
          label={'Chi phí thuê nhà'}
          important={true}
          unit={'VNĐ'}
          placeholder={'Nhập chi phí thuê nhà'}
          keyboardType={'numeric'}
          defaultValue={`${leasingFee}`}
          onEndEditing={event => setLeasingFee(event.nativeEvent.text)}
        />

        <CustomNote
          title={'Mô tả'}
          placeholder={'Nhập mô tả cho tòa nhà'}
          defaultValue={description}
          onEndEditing={evt => setDescription(evt.nativeEvent.text)}
        />

        <View style={styles.line} />
        <CustomTextTitle label={'Địa chỉ tòa nhà'} />
        <CustomInput
          type={'button'}
          styleViewInput={{marginTop: 10}}
          title={'Tỉnh/ Thành phố'}
          placeholder={'Chọn Tỉnh/ Thành phố'}
          value={cityName}
          onPress={() => setModalCity(true)}
        />
        <CustomInput
          type={'button'}
          styleViewInput={{marginTop: 10}}
          title={'Quận/ Huyện'}
          placeholder={'Chọn Quận/ Huyện'}
          value={districtName}
          onPress={() => setModalDistrict(true)}
        />
        <CustomInput
          type={'button'}
          styleViewInput={{marginTop: 10}}
          title={'Phường/ Xã'}
          placeholder={'Chọn Phường/ Xã'}
          value={wardName}
          onPress={() => setModalWard(true)}
        />

        <CustomNote
          title={'Địa chỉ cụ thể'}
          placeholder={'Nhập địa chỉ cụ thể'}
          defaultValue={address}
          onEndEditing={evt => setAddress(evt.nativeEvent.text)}
        />

        <View style={styles.line} />

        <CustomTextTitle label={'Thêm ảnh tòa nhà'} />
        <View style={styles.viewUploadImage}>
          {hauseImages.length > 0 ? (
            <FlatList
              horizontal
              data={hauseImages}
              keyExtractor={uuid}
              renderItem={({item}) => renderImage(item)}
            />
          ) : (
            <CustomButton
              styleButton={{flex: 1}}
              label={'Tải lên ảnh đại diện tòa nhà'}
              styleLabel={[styles.title, {marginTop: 5}]}
              disabled={true}
              icon={icons.ic_upload}
              styleIcon={{with: 100, height: 100, alignSelf: 'center'}}
            />
          )}
        </View>
        <CustomButton
          styleButton={[styles.buttonUploadIM]}
          label={'Tải lên ảnh đại diện tòa nhà'}
          styleLabel={styles.labelUploadIM}
          onPress={() => setModalCamera(true)}
        />
        <View style={{marginBottom: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Hủy'}
          rightLabel={'Tiếp tục'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => goToStepTwo()}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
  content: {color: 'grey', fontSize: 12},
  viewTime: {
    height: 32,
    paddingHorizontal: 3,
    backgroundColor: '#ebedee',
    borderRadius: 4,
  },
  time: {
    borderRadius: 5,
    color: '#50595f',
    fontSize: 14,
  },
  title: {fontSize: 13, color: 'grey'},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewTextInput: {
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 10,
    borderColor: '#e2e5e6',
    height: 120,
    backgroundColor: 'white',
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'black',
    marginVertical: 20,
    alignSelf: 'center',
  },
  viewUploadImage: {
    height: 220,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  buttonUploadIM: {
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 10,
  },
  labelUploadIM: {color: 'white', fontWeight: '500', fontSize: 15},
});

export default AddBuildings;
