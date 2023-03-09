import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import CustomButton from '../../../Components/CustomButton';
import CustomManagerInfor from '../../../Components/CustomPersonInfor';
import CustomModalDateTimePicker from '../../../Components/CustomModalDateTimePicker';
import CustomTwoButtonBottom from '../../../Components/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../Components/CustomModalCamera';
import {uuid} from '../../../utils/uuid';
import CustomInput from '../../../Components/CustomInput';
import CustomTimeButtons from '../../../Components/CustomTimeButton';
import CustomAppBarStep from '../../../Components/CustomAppBarStep';
import CustomTextTitle from '../../../Components/CustomTextTitle';
import CustomSuggest from '../../../Components/CustomSuggest';
import CustomModalPicker from '../../../Components/CustomModalPicker';
import CustomLoading from '../../../Components/CustomLoading';
import {
  GetAllCityApi,
  GetDistrictByCityIdApi,
  GetWardByCityIdApi,
} from '../../../Api/Home/HomeApis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddBuildings = props => {
  const navigation = useNavigation();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  let avatar =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ragdoll_Kater%2C_drei_Jahre_alt%2C_RAG_n_21_seal-tabby-colourpoint%2C_Januar_2015.JPG/330px-Ragdoll_Kater%2C_drei_Jahre_alt%2C_RAG_n_21_seal-tabby-colourpoint%2C_Januar_2015.JPG';

  const [name, setName] = useState('');
  const [floorTotal, setFloorTotal] = useState('');
  const [openHour, setOpenHour] = useState('08:00:00');
  const [closeHour, setCloseHour] = useState('23:00:00');
  const [rentingPrice, setRentingPrice] = useState('');
  const [description, setDescription] = useState('');
  const [cityId, setCityId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [wardId, setWardId] = useState('');
  const [address, setAddress] = useState('');

  const [albumImage, setAlbumImage] = useState([]);

  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());

  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [cityName, setCityName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [wardName, setWardName] = useState('');

  const [modalFromTime, setModalFromTime] = useState(false);
  const [modalToTime, setModalToTime] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalCity, setModalCity] = useState(false);
  const [modalDistrict, setModalDistrict] = useState(false);
  const [modalWard, setModalWard] = useState(false);

  useEffect(() => {
    getCityData();
  }, []);

  const getCityData = async () => {
    await AsyncStorage.getItem('token')
      .then(async value => {
        setToken(value);
        await GetAllCityApi(value)
          .then(res => {
            if (res?.status == 200) {
              setListCity(res?.data);
              setLoading(false);
            }
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  const getDistrictData = async item => {
    setCityName(item?.name);
    setCityId(item?.id);
    setLoading(true);
    await GetDistrictByCityIdApi(token, item?.id)
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
    setLoading(true);
    await GetWardByCityIdApi(token, item?.id)
      .then(res => {
        console.log(res?.data);
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
        {modalFromTime && (
          <CustomModalDateTimePicker
            onCancel={() => setModalFromTime(false)}
            value={fromTime}
            mode={'time'}
            openPicker={modalFromTime}
            onDateChange={value => {
              let newTime = value.toLocaleTimeString('en-VN');
              setFromTime(value);
              setOpenHour(newTime);
            }}
            onPress={() => setModalFromTime(false)}
          />
        )}
        {modalToTime && (
          <CustomModalDateTimePicker
            onCancel={() => setModalToTime(false)}
            value={toTime}
            mode={'time'}
            openPicker={modalToTime}
            onDateChange={value => {
              let newTime = value.toLocaleTimeString('en-VN');
              setToTime(value);
              setCloseHour(newTime);
            }}
            onPress={() => setModalToTime(false)}
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
          label={'Thiết lập thông tin'}
          iconRight={icons.ic_bell}
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
            value={name}
            onChangeText={text => set(text)}
          />
          <CustomInput
            important={true}
            keyboardType={'numeric'}
            type={'input'}
            styleViewInput={{marginTop: 10}}
            title={'Số tầng'}
            placeholder={'Nhập số tầng'}
            value={floorTotal}
            onChangeText={text => setFloorTotal(text)}
          />

          <CustomTimeButtons
            styleContainer={{marginTop: 20}}
            title={'Giờ mở - đóng cửa'}
            leftLabel={'Từ'}
            rightLabel={'Đến'}
            styleButtonLeft={{marginRight: 5}}
            styleButtonRight={{marginLeft: 5}}
            valueLeft={openHour}
            valueRight={closeHour}
            onPressLeft={() => setModalFromTime(true)}
            onPressRightt={() => setModalToTime(true)}
          />
          <Text style={[styles.label, {marginTop: 10}]}>Chi phí thuê nhà</Text>
          <View style={styles.viewSurrounded}>
            <TextInput
              keyboardType="numeric"
              placeholder="Nhập chi phí thuê nhà (Nếu có)"
              value={rentingPrice}
              onChangeText={text => setRentingPrice(text)}
              style={{flex: 1}}
            />
            <View style={styles.viewTime}>
              <Text style={styles.time}>VNĐ</Text>
            </View>
          </View>

          <Text style={[styles.label, {marginTop: 10}]}>Mô tả</Text>
          <View style={styles.viewTextInput}>
            <TextInput
              multiline
              placeholder="Nhập mô tả cho tòa nhà"
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </View>

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
          <Text style={[styles.label, {marginTop: 10}]}>Địa chỉ cụ thể</Text>
          <View style={styles.viewTextInput}>
            <TextInput
              multiline
              placeholder="Nhập địa chỉ cụ thể"
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </View>
          <View style={styles.line} />
          <CustomTextTitle label={'Quản lý tòa nhà'} labelButton={'Thêm '} />
          <CustomManagerInfor
            styleView={{marginTop: 10}}
            avatar={avatar}
            userName={'Trường Vân'}
            phoneNumber={`0123456789`}
            onPress={() => {}}
          />

          <View style={styles.line} />
          <Text style={[styles.textTitle, {marginVertical: 5}]}>
            Thêm ảnh tòa nhà
          </Text>
          <View
            style={{
              height: 200,
              borderWidth: 0.5,
              borderColor: colors.mainColor,
              marginVertical: 5,
              borderRadius: 10,
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
        </ScrollView>
        <CustomTwoButtonBottom
          leftLabel={'Hủy'}
          rightLabel={'Tiếp tục'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => navigation.navigate('AddBuildingsStep2')}
        />
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
    // backgroundColor: '#f8f9f9',
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
    // backgroundColor: '#f8f9f9',
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
