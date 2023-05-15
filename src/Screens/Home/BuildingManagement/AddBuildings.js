import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Alert, ScrollView} from 'react-native';
import CustomModalDateTimePicker from '../../../Components/CommonComponent/CustomModalDateTimePicker';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import CustomTimeButtons from '../../../Components/CommonComponent/CustomTimeButton';
import CustomStepAppBar from '../../../Components/CommonComponent/CustomStepAppBar';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomModalPicker from '../../../Components/CommonComponent/CustomModalPicker';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {
  GetLocationCitysApi,
  GetDistrictByCityIdApi,
  GetWardByDistrictIdApi,
} from '../../../Api/Home/BuildingApis/BuildingApis';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {updateCommon, updateManagers} from '../../../Store/slices/commonSlice';
import {GetListManagersApi} from '../../../Api/Home/ManagerApis/ManagerApis';
import {formatNumber, validateNumber} from '../../../utils/common';
import {StraightLine} from '../../../Components/CommonComponent/LineComponent';
import ComponentInput from '../../../Components/CommonComponent/ComponentInput';
import ComponentButton from '../../../Components/CommonComponent/ComponentButton';
import ComponentRenderImage from '../../../Components/CommonComponent/ComponentRenderImage';

const AddBuildings = props => {
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

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
  }, []);

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

  const goToStepTwo = () => {
    let data = {
      name: name,
      numberOfFloor: parseInt(`${validateNumber(`${numberOfFloor}`)}`),
      openTime: `${openTime}`,
      closeTime: `${closeTime}`,
      leasingFee: parseInt(`${validateNumber(`${leasingFee ?? '0'}`)}`),
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
    <View style={styles.container}>
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

      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={[styles.eachContainer]}>
        <CustomSuggest
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />
        <CustomTextTitle label={'Thông tin tòa nhà'} />

        <ComponentInput
          important={true}
          type={'input'}
          title={'Tên tòa nhà'}
          placeholder={'Nhập tên tòa nhà'}
          value={name}
          onChangeText={text => setName(text)}
        />
        <ComponentInput
          important={true}
          type={'input'}
          title={'Số tầng'}
          placeholder={'Nhập số tầng'}
          keyboardType={'number-pad'}
          viewComponent={{marginTop: 10}}
          value={`${formatNumber(`${numberOfFloor}`)}`}
          onChangeText={text => setNumberOfFloor(text)}
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
        <ComponentInput
          type={'inputUnit'}
          title={'Chi phí thuê nhà'}
          unit={'VNĐ'}
          placeholder={'Nhập chi phí thuê nhà'}
          keyboardType={'number-pad'}
          viewComponent={{marginTop: 10}}
          value={`${formatNumber(leasingFee)}`}
          onChangeText={text => setLeasingFee(text)}
        />
        <ComponentInput
          type={'inputNote'}
          title={'Mô tả'}
          placeholder={'Nhập mô tả cho tòa nhà'}
          viewComponent={{marginTop: 10}}
          value={description}
          onChangeText={text => setDescription(text)}
        />

        {StraightLine()}
        <CustomTextTitle label={'Địa chỉ tòa nhà'} />
        <ComponentButton
          important={true}
          type={'buttonSelect'}
          viewComponent={{marginTop: 10}}
          title={'Tỉnh/ Thành phố'}
          placeholder={'Chọn Tỉnh/ Thành phố'}
          value={cityName}
          onPress={() => setModalCity(true)}
        />
        <ComponentButton
          important={true}
          type={'buttonSelect'}
          viewComponent={{marginTop: 10}}
          title={'Quận/ Huyện'}
          placeholder={'Chọn Quận/ Huyện'}
          value={districtName}
          onPress={() => setModalDistrict(true)}
        />
        <ComponentButton
          important={true}
          type={'buttonSelect'}
          viewComponent={{marginTop: 10}}
          title={'Phường/ Xã'}
          placeholder={'Chọn Phường/ Xã'}
          value={wardName}
          onPress={() => setModalWard(true)}
        />

        <ComponentInput
          type="inputNote"
          title={'Địa chỉ cụ thể'}
          placeholder={'Nhập địa chỉ cụ thể'}
          viewComponent={{marginTop: 10}}
          value={address}
          onChangeText={text => setAddress(text)}
        />

        {StraightLine()}
        <ComponentRenderImage
          title={'Thêm ảnh tòa nhà'}
          label={'Tải lên ảnh đại diện tòa nhà'}
          labelUpload={'Tải lên ảnh tòa nhà'}
          data={hauseImages}
          deleteButton={true}
          openModal={() => setModalCamera(true)}
          deleteItem={item => {
            let result = [...hauseImages];
            let newResult = result.filter(itemResult => itemResult !== item);
            setHauseImages(newResult);
          }}
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
  container: {flex: 1},
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
});

export default AddBuildings;
