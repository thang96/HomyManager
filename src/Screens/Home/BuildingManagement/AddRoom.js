import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, Alert} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import RenderService from '../../../Components/ComponentHome/RenderService';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import {uuid} from '../../../utils/uuid';
import CustomInput from '../../../Components/CommonComponent/CustomInput';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import ImagePicker from 'react-native-image-crop-picker';
import CustomInputValue from '../../../Components/CommonComponent/CustomInputValue';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {GetListHausesApi} from '../../../Api/Home/BuildingApis/BuildingApis';
import CustomModalPicker from '../../../Components/CommonComponent/CustomModalPicker';
import {GetListServicesApi} from '../../../Api/Home/ServiceApis/ServiceApis';
import {GetListAmenitysApi} from '../../../Api/Home/AmenityApis/AmenityApis';
import {
  amenityState,
  serviceState,
  updateAmenity,
  updateServices,
} from '../../../Store/slices/commonSlice';
import {
  CreateNewUnitApi,
  PostImageUnitApi,
} from '../../../Api/Home/UnitApis/UnitApis';
import {updateStatus} from '../../../Store/slices/statusSlice';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import RenderImage from '../../../Components/ComponentHome/RenderImage';
import CustomPickerDay from '../../../Components/CommonComponent/CustomPickerDay';
import {UNITTYPE} from '../../../Resource/DataPicker';

const AddRoom = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const tokenStore = useSelector(token);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const dispatch = useDispatch();
  const hauseId = route.params;
  const [hause, setHause] = useState('');
  const [name, setName] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [rentMonthlyFee, setRentMonthlyFee] = useState('');
  const [area, setArea] = useState('');
  const [limitTenantNumber, setLimitTenantNumber] = useState('');
  const [depositMoney, setDepositMoney] = useState('');
  const [description, setDescription] = useState('');
  const [notice, setNotice] = useState('');
  const [serviceIds, setServiceIds] = useState([]);
  const [amenityIds, setAmenityIds] = useState([]);
  const [unitImages, setUnitImages] = useState([]);

  const [listHauses, setListHauses] = useState([]);
  const [listService, setListService] = useState([]);
  const [listAmenity, setListAmenity] = useState([]);

  const [loadingRoom, setLoadingRoom] = useState(false);
  const [modalAddRoom, setModalAddRoom] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalHauses, setModalHauses] = useState(false);
  const [modalUnitType, setModalUnitType] = useState(false);

  useEffect(() => {
    const getListData = async () => {
      await GetListHausesApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            setListHauses(res?.data);
            setLoadingRoom(false);
          }
        })
        .catch(error => console.log(error, 'listHauses'));

      await GetListServicesApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let eachData = res?.data;
            let eachArray = [];
            eachData.map((data, index) => {
              let newData = {...data, isCheck: false};
              eachArray.push(newData);
            });
            dispatch(updateServices(eachArray));
          }
        })
        .catch(error => console.log(error));

      await GetListAmenitysApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let eachData = res?.data;
            let eachArray = [];
            eachData.map((data, index) => {
              let newData = {...data, isCheck: false};
              eachArray.push(newData);
            });
            dispatch(updateAmenity(eachArray));
          }
        })
        .catch(error => console.log(error));
    };
    getListData();
  }, []);

  useEffect(() => {
    let eachService = [];
    if (serviceSelect.length > 0) {
      serviceSelect.map((item, index) => {
        if (item?.isCheck == true) {
          eachService.push(item);
        }
      });
      setListService(eachService);
    }
    let eachAmenityIds = [];
    if (amenitySelect.length > 0) {
      amenitySelect.map((item, index) => {
        if (item?.isCheck == true) {
          eachAmenityIds.push(item);
        }
      });
      setListAmenity(eachAmenityIds);
    }
  }, [serviceSelect, amenitySelect]);

  useEffect(() => {
    const setListData = () => {
      let eachServiceIds = [];
      let eachAmenityIds = [];
      listService.map((item, index) => {
        eachServiceIds.push(item?.id);
      });
      listAmenity.map((item, index) => {
        eachAmenityIds.push(item?.id);
      });
      setServiceIds(eachServiceIds);
      setAmenityIds(eachAmenityIds);
    };
    setListData();
  }, [listService, listAmenity]);

  const renderPaidSevice = (item, index) => {
    return <RenderService label={item?.name} value={item?.fee} />;
  };

  const renderFreeSevice = (item, index) => {
    return <RenderAmenity label={item?.name} />;
  };

  const openCamera = () => {
    setModalCamera(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        const eachResult = [...unitImages, eachImg];
        setUnitImages(eachResult);
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
        const eachResult = [...unitImages];
        const newResult = eachResult.concat(albumImg);
        setUnitImages(newResult);
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
          let result = [...unitImages];
          let newResult = result.filter(itemResult => itemResult !== item);
          setUnitImages(newResult);
        }}
      />
    );
  };

  const createNewUnit = async () => {
    setLoadingRoom(true);
    let hauseIdSelect = hause?.id;
    let data = {
      name: name,
      floorNumber: parseInt(floorNumber),
      openTime: '',
      rentMonthlyFee: parseInt(rentMonthlyFee),
      roomType: roomType,
      area: parseInt(area),
      limitTenantNumber: parseInt(limitTenantNumber),
      depositMoney: parseInt(depositMoney),
      description: description,
      notice: notice,
      serviceIds: serviceIds,
      amenityIds: amenityIds,
    };
    await CreateNewUnitApi(tokenStore, hauseIdSelect, data)
      .then(async res => {
        if (res?.status == 200) {
          let unitId = res?.data?.id;
          await PostImageUnitApi(tokenStore, unitId, unitImages)
            .then(res => {
              if (res?.status == 200) {
                dispatch(updateStatus(true));
                navigation.navigate('FloorInformation', hauseId);
                setLoadingRoom(false);
              }
            })
            .catch(error => {
              setLoadingRoom(false);
              Alert.alert(
                'Thông báo',
                `Đã có lỗi sảy ra,vui lòng liên hệ với admin...`,
              );
            });
        }
      })
      .catch(error => {
        setLoadingRoom(false);
        Alert.alert(
          'Thông báo',
          `Đã có lỗi sảy ra,vui lòng liên hệ với admin...`,
        );
      });
  };

  return (
    <View style={styles.container}>
      {loadingRoom && <CustomLoading />}
      {modalAddRoom && (
        <CustomModalNotify
          title={'Tạo phòng mới'}
          label={'Bạn có muốn thêm phòng mới ?'}
          modalVisible={modalAddRoom}
          onRequestClose={() => setModalAddRoom(false)}
          pressConfirm={() => createNewUnit()}
        />
      )}
      {modalUnitType && (
        <CustomPickerDay
          data={UNITTYPE}
          modalVisible={modalUnitType}
          onRequestClose={() => setModalUnitType(false)}
          onPress={item => {
            setRoomType(item?.key);
            setModalUnitType(false);
          }}
        />
      )}
      {modalHauses && (
        <CustomModalPicker
          pressClose={() => setModalHauses(false)}
          data={listHauses}
          onPressItem={item => {
            setHause(item);
            setModalHauses(false);
          }}
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
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Thêm phòng'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <Text style={styles.content}>
          Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc
        </Text>
        <CustomTextTitle label={'Thông tin phòng'} />
        <CustomInput
          important={true}
          type={'button'}
          title={'Tòa nhà'}
          placeholder={'Chọn tòa nhà'}
          value={hause?.name}
          onPress={() => setModalHauses(true)}
        />
        <CustomInput
          keyboardType={'numeric'}
          type={'input'}
          styleViewInput={{marginTop: 10}}
          title={'Tầng'}
          placeholder={'Nhập số tầng'}
          defaultValue={floorNumber}
          onEndEditing={event => setFloorNumber(event.nativeEvent.text)}
        />
        <CustomInput
          important={true}
          type={'input'}
          styleViewInput={{marginTop: 10}}
          title={'Tên phòng'}
          placeholder={'Nhập tên phòng'}
          defaultValue={name}
          onEndEditing={event => setName(event.nativeEvent.text)}
        />
        <CustomInput
          important={true}
          keyboardType={'numeric'}
          type={'input'}
          styleViewInput={{marginTop: 10}}
          title={'Giá thuê phòng'}
          placeholder={'Nhập giá thuê phòng'}
          defaultValue={rentMonthlyFee}
          onEndEditing={event => setRentMonthlyFee(event.nativeEvent.text)}
        />
        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 10}}
          title={'Loại phòng'}
          placeholder={'Chọn loại phòng'}
          value={roomType}
          onPress={() => setModalUnitType(true)}
        />

        <CustomInputValue
          viewContainer={{marginTop: 20}}
          label={'Diện tích'}
          type={'input'}
          placeholder={'Nhập diện tích'}
          keyboardType={'numeric'}
          unit={'m2'}
          defaultValue={area}
          onEndEditing={event => setArea(event.nativeEvent.text)}
        />

        <CustomInputValue
          viewContainer={{marginTop: 20}}
          label={'Giới hạn số người cho thuê'}
          type={'input'}
          placeholder={'Nhập số người'}
          keyboardType={'numeric'}
          unit={'Người'}
          defaultValue={limitTenantNumber}
          onEndEditing={event => setLimitTenantNumber(event.nativeEvent.text)}
        />

        <CustomInputValue
          viewContainer={{marginTop: 20}}
          important={true}
          label={'Tiền đặt cọc'}
          type={'input'}
          placeholder={'Nhập số tiền cọc khi khách thuê'}
          keyboardType={'numeric'}
          unit={'VNĐ'}
          defaultValue={depositMoney}
          onEndEditing={event => setDepositMoney(event.nativeEvent.text)}
        />

        <Text style={[styles.label, {marginTop: 10}]}>Mô tả</Text>
        <View style={styles.viewTextInput}>
          <TextInput
            placeholder={'Nhập mô tả phòng'}
            multiline
            defaultValue={description}
            onEndEditing={event => setDescription(event.nativeEvent.text)}
          />
        </View>

        <Text style={[styles.label, {marginTop: 10}]}>
          Lưu ý cho người thuê
        </Text>
        <View style={styles.viewTextInput}>
          <TextInput
            placeholder={'Nhập lưu ý cho người thuê'}
            multiline
            defaultValue={notice}
            onEndEditing={event => setNotice(event.nativeEvent.text)}
          />
        </View>

        <View style={styles.line} />
        <CustomTextTitle
          label={'Dịch vụ có phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Service')}
        />
        <Text style={{fontSize: 13, color: '#7F8A93'}}>
          Chỉnh sửa dịch vụ phòng sẽ không ảnh hưởng đến dịch vụ của tòa nhà
        </Text>
        {listService.length > 0 ? (
          <FlatList
            listKey="listService"
            horizontal={false}
            scrollEnabled={false}
            numColumns={2}
            keyExtractor={key => key.id}
            data={listService}
            renderItem={({item, index}) => renderPaidSevice(item, index)}
          />
        ) : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listService.length}`}</Text>
        </View>
        <View style={styles.line} />

        <CustomTextTitle
          label={'Tiện ích miễn phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Utilities')}
        />
        <Text style={{fontSize: 13, color: '#7F8A93'}}>
          Chỉnh sửa dịch vụ phòng sẽ không ảnh hưởng đến dịch vụ của tòa nhà
        </Text>
        {listAmenity.length > 0 ? (
          <FlatList
            listKey="listAmenity"
            horizontal={false}
            scrollEnabled={false}
            numColumns={3}
            keyExtractor={key => key.id}
            data={listAmenity}
            renderItem={({item, index}) => renderFreeSevice(item, index)}
          />
        ) : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listAmenity.length}`}</Text>
        </View>

        <View style={styles.line} />

        <CustomTextTitle label={'Thêm hình ảnh'} />
        <View
          style={{
            height: 220,
            marginVertical: 5,
            borderRadius: 10,
            backgroundColor: 'white',
          }}>
          {unitImages.length > 0 ? (
            <FlatList
              horizontal
              data={unitImages}
              keyExtractor={uuid}
              renderItem={({item}) => renderImage(item)}
            />
          ) : (
            <CustomButton
              styleButton={{flex: 1}}
              label={'Tải lên ảnh phòng (1-6 ảnh)'}
              styleLabel={[styles.title, {marginTop: 5}]}
              disabled={true}
              icon={icons.ic_upload}
              styleIcon={{with: 100, height: 100, alignSelf: 'center'}}
            />
          )}
        </View>

        <CustomButton
          styleButton={[styles.buttonUploadIM]}
          label={'Tải lên ảnh phòng'}
          styleLabel={styles.labelUploadIM}
          onPress={() => setModalCamera(true)}
        />

        <View style={{height: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Tiếp tục'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => setModalAddRoom(true)}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  content: {color: '#7F8A93', fontSize: 13},

  textTitle: {color: '#173b5f', fontSize: 16, fontWeight: 'bold'},
  label: {fontSize: 15, color: '#5f666b'},

  viewTextInput: {
    minHeight: 120,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: colors.borderInput,
  },
  line: {
    height: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'black',
    marginVertical: 20,
  },
  textPicker: {fontSize: 15, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
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
});
export default AddRoom;
