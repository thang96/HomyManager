import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Keyboard,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
  Alert,
} from 'react-native';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import CustomManagerInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import CustomModalDateTimePicker from '../../../Components/CommonComponent/CustomModalDateTimePicker';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import {uuid} from '../../../utils/uuid';
import CustomInput from '../../../Components/CommonComponent/CustomInput';
import CustomTimeButtons from '../../../Components/CustomTimeButton';
import CustomAppBarStep from '../../../Components/CustomAppBarStep';
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
import {updateCommon} from '../../../Store/slices/commonSlice';

const AddBuildings = props => {
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [keyboard, setKeyboard] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

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

  const goToStepTwo = () => {
    let data = {
      name: name,
      numberOfFloor: numberOfFloor,
      openTime: `${openTime}`,
      closeTime: `${closeTime}`,
      leasingFee: parseInt(leasingFee),
      description: description,
      cityId: cityId,
      districtId: districtId,
      wardId: wardId,
      address: address,
    };
    if (name == '' && numberOfFloor == '') {
      Alert.alert(
        'Thi???u tr?????ng th??ng tin',
        'Vui l??ng ??i???n ?????y ????? m???c th??ng tin c?? d???u *',
      );
    } else {
      dispatch(updateCommon(data));
      navigation.navigate('AddBuildingsStep2');
    }
  };

  const [albumImage, setAlbumImage] = useState([]);

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
    getCityData();
  }, [tokenStore]);

  const getCityData = async () => {
    await GetLocationCitysApi(tokenStore)
      .then(res => {
        if (res?.status == 200) {
          setListCity(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading && <CustomLoading />}
      <KeyboardAvoidingView style={{flex: 1}}>
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

        <CustomAppBarStep
          iconLeft={icons.ic_back}
          label={'Thi???t l???p th??ng tin'}
          iconRight={icons.ic_bell}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
          step={1}
        />

        <ScrollView style={[styles.eachContainer]}>
          <CustomSuggest
            label={'Vui l??ng ??i???n ?????y ????? th??ng tin! M???c c?? d???u * l?? b???t bu???c'}
          />
          <CustomTextTitle label={'Th??ng tin t??a nh??'} />
          <CustomInput
            important={true}
            type={'input'}
            title={'T??n t??a nh??'}
            placeholder={'Nh???p t??n t??a nh??'}
            value={name}
            onChangeText={text => setName(text)}
          />
          <CustomInput
            important={true}
            keyboardType={'numeric'}
            type={'input'}
            styleViewInput={{marginTop: 10}}
            title={'S??? t???ng'}
            placeholder={'Nh???p s??? t???ng'}
            value={numberOfFloor}
            onChangeText={text => setNumberOfFloor(text)}
          />

          <CustomTimeButtons
            styleContainer={{marginTop: 20}}
            title={'Gi??? m??? - ????ng c???a'}
            leftLabel={'T???'}
            rightLabel={'?????n'}
            styleButtonLeft={{marginRight: 5}}
            styleButtonRight={{marginLeft: 5}}
            valueLeft={openTimeValue}
            valueRight={closeTimeValue}
            onPressLeft={() => setModalopenTime(true)}
            onPressRightt={() => setModalcloseTime(true)}
          />
          <Text style={[styles.label, {marginTop: 10}]}>Chi ph?? thu?? nh??</Text>
          <View style={styles.viewSurrounded}>
            <TextInput
              keyboardType="numeric"
              placeholder="Nh???p chi ph?? thu?? nh?? (N???u c??)"
              value={leasingFee}
              onChangeText={text => setLeasingFee(text)}
              style={{flex: 1}}
            />
            <View style={styles.viewTime}>
              <Text style={styles.time}>VN??</Text>
            </View>
          </View>

          <Text style={[styles.label, {marginTop: 10}]}>M?? t???</Text>
          <View style={styles.viewTextInput}>
            <TextInput
              multiline
              placeholder="Nh???p m?? t??? cho t??a nh??"
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </View>

          <View style={styles.line} />
          <CustomTextTitle label={'?????a ch??? t??a nh??'} />
          <CustomInput
            type={'button'}
            styleViewInput={{marginTop: 10}}
            title={'T???nh/ Th??nh ph???'}
            placeholder={'Ch???n T???nh/ Th??nh ph???'}
            value={cityName}
            onPress={() => setModalCity(true)}
          />
          <CustomInput
            type={'button'}
            styleViewInput={{marginTop: 10}}
            title={'Qu???n/ Huy???n'}
            placeholder={'Ch???n Qu???n/ Huy???n'}
            value={districtName}
            onPress={() => setModalDistrict(true)}
          />
          <CustomInput
            type={'button'}
            styleViewInput={{marginTop: 10}}
            title={'Ph?????ng/ X??'}
            placeholder={'Ch???n Ph?????ng/ X??'}
            value={wardName}
            onPress={() => setModalWard(true)}
          />
          <Text style={[styles.label, {marginTop: 10}]}>?????a ch??? c??? th???</Text>
          <View style={styles.viewTextInput}>
            <TextInput
              multiline
              placeholder="Nh???p ?????a ch??? c??? th???"
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </View>
          <View style={styles.line} />
          <CustomTextTitle label={'Qu???n l?? t??a nh??'} labelButton={'Th??m '} />
          <CustomManagerInfor
            styleView={{marginTop: 10}}
            avatar={null}
            userName={'Tr?????ng V??n'}
            phoneNumber={`0123456789`}
            onPress={() => {}}
          />

          <View style={styles.line} />
          <Text style={[styles.textTitle, {marginVertical: 5}]}>
            Th??m ???nh t??a nh??
          </Text>
          <View
            style={{
              height: 200,
              borderWidth: 0.5,
              borderColor: colors.borderInput,
              marginVertical: 5,
              borderRadius: 10,
              backgroundColor: 'white',
            }}>
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
                label={'T???i l??n ???nh ?????i di???n t??a nh??'}
                styleLabel={[styles.title, {marginTop: 5}]}
                disabled={true}
                icon={icons.ic_upload}
                styleIcon={{with: 100, height: 100, alignSelf: 'center'}}
              />
            )}
          </View>
          <CustomButton
            styleButton={[styles.buttonUploadIM]}
            label={'T???i l??n ???nh ?????i di???n t??a nh??'}
            styleLabel={styles.labelUploadIM}
            onPress={() => setModalCamera(true)}
          />
          <View style={{marginBottom: 56}} />
        </ScrollView>
        {!keyboard && (
          <CustomTwoButtonBottom
            leftLabel={'H???y'}
            rightLabel={'Ti???p t???c'}
            onPressLeft={() => navigation.goBack()}
            onPressRight={() => goToStepTwo()}
          />
        )}
      </KeyboardAvoidingView>
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
  label: {fontSize: 15, color: '#5f666b'},
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
  viewSurrounded: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 10,
    borderColor: '#ACB4B9',
    backgroundColor: 'white',
  },
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
    height: 1,
    backgroundColor: 'black',
    marginVertical: 20,
    alignSelf: 'center',
  },
  icon: {width: 20, height: 20},

  buttonUploadIM: {
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 10,
  },
  labelUploadIM: {color: 'white', fontWeight: '500', fontSize: 15},
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
  customButtonIcon: {position: 'absolute', right: 3, top: 3, zIndex: 1},
  imageStyle: {width: 20, height: 20, tintColor: 'red'},
});

export default AddBuildings;
