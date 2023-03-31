import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
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
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {
  GetListHausesApi,
  HauseDetailApi,
} from '../../../Api/Home/BuildingApis/BuildingApis';
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
  GetUnitDetailAPi,
  PutUnitApi,
} from '../../../Api/Home/UnitApis/UnitApis';
import {updateStatus} from '../../../Store/slices/statusSlice';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import RenderImage from '../../../Components/ComponentHome/RenderImage';
import CustomPickerDay from '../../../Components/CommonComponent/CustomPickerDay';
import {UNITTYPE} from '../../../Resource/DataPicker';
import {PostImageUnitApi} from '../../../Api/Home/FileDataApis/FileDataApis';

const EditRoomInformation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const unitId = route.params;
  const tokenStore = useSelector(token);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const dispatch = useDispatch();

  const [hause, setHause] = useState('');
  const [unitImages, setUnitImages] = useState([]);

  const [listHauses, setListHauses] = useState([]);

  const [loadingRoom, setLoadingRoom] = useState(true);
  const [modalAddRoom, setModalAddRoom] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalHauses, setModalHauses] = useState(false);
  const [modalUnitType, setModalUnitType] = useState(false);

  const [unit, setUnit] = useState();

  useEffect(() => {
    const getListData = async () => {
      await GetListHausesApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            setListHauses(res?.data);
          }
        })
        .catch(error => console.log(error, 'listHauses'));

      await GetUnitDetailAPi(tokenStore, unitId)
        .then(async res => {
          if (res?.status == 200) {
            setUnit(res?.data);

            let eachData = res?.data?.amenities;
            let eachArray = [];
            eachData.map((data, index) => {
              let newData = {...data, isCheck: true};
              eachArray.push(newData);
            });
            dispatch(updateAmenity(eachArray));

            let eachDataService = res?.data?.chargeServices;
            let eachService = [];
            eachDataService.map((data, index) => {
              let newData = {...data, isCheck: true};
              eachService.push(newData);
            });
            dispatch(updateServices(eachService));

            let hauseId = res?.data?.house?.id;
            await HauseDetailApi(tokenStore, hauseId)
              .then(res => {
                if (res?.status == 200) {
                  setHause(res?.data);
                  setLoadingRoom(false);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => console.log(error, 'error unit detail'));
    };
    getListData();
  }, []);

  const listService = useMemo(() => {
    let eachService = [];
    if (serviceSelect.length > 0) {
      serviceSelect.map((item, index) => {
        if (item?.isCheck == true) {
          eachService.push(item);
        }
      });
    }
    return eachService;
  }, [serviceSelect]);

  const listAmenity = useMemo(() => {
    let eachAmenityIds = [];
    if (amenitySelect.length > 0) {
      amenitySelect.map((item, index) => {
        if (item?.isCheck == true) {
          eachAmenityIds.push(item);
        }
      });
    }
    return eachAmenityIds;
  }, [amenitySelect]);

  const serviceIds = useMemo(() => {
    let eachServiceIds = [];
    listService.map((item, index) => {
      eachServiceIds.push(item?.id);
    });
    return eachServiceIds;
  }, [listService]);

  const amenityIds = useMemo(() => {
    let eachAmenityIds = [];
    listAmenity.map((item, index) => {
      eachAmenityIds.push(item?.id);
    });
    return eachAmenityIds;
  }, [listAmenity]);

  const renderPaidSevice = (item, index) => {
    return (
      <RenderService
        name={item?.name}
        fee={item?.fee}
        calculateUnit={item?.calculateUnit}
      />
    );
  };

  const renderFreeSevice = (item, index) => {
    return <RenderAmenity label={item?.name} />;
  };

  const openCamera = () => {
    setModalCamera(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        let eachUnitImage = [...unitImages, eachImg];
        setUnitImages(eachUnitImage);
        let eachImages = [...unit?.images, eachImg];
        const eachResult = {...unit, images: eachImages};
        setUnit(eachResult);
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
        let eachImages = [...unit?.images];
        const newResult = eachImages.concat(albumImg);
        const eachResult = {...unit, images: newResult};
        setUnit(eachResult);
        let eachUnitImages = [...unitImages];
        const newResultImages = eachUnitImages.concat(albumImg);
        setUnitImages(newResultImages);
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
          let result = [...unit?.images];
          let newResult = result.filter(itemResult => itemResult !== item);
          let eachResult = {...unit, images: newResult};
          setUnit(eachResult);
        }}
      />
    );
  };
  const createNewUnit = async () => {
    setModalAddRoom(false);
    setLoadingRoom(true);
    let data = {
      name: unit?.name,
      floorNumber: parseInt(unit?.floorNumber),
      openTime: '',
      rentMonthlyFee: parseInt(unit?.rentMonthlyFee),
      roomType: unit?.roomType,
      area: parseInt(unit?.area),
      limitTenantNumber: parseInt(unit?.limitTenantNumber),
      depositMoney: parseInt(unit?.depositMoney),
      description: unit?.description,
      notice: unit?.notice,
      serviceIds: serviceIds,
      amenityIds: amenityIds,
    };
    await PutUnitApi(tokenStore, unitId, data)
      .then(async res => {
        if (res?.status == 200) {
          await PostImageUnitApi(tokenStore, unitId, unitImages)
            .then(res => {
              if (res?.status == 200) {
                dispatch(updateStatus(false));
                setLoadingRoom(false);
                navigation.navigate('FloorInformation', hause?.id);
              }
            })
            .catch(error => {
              console.log(error, 'img');
            });
        }
      })
      .catch(error => {
        console.log(error, 'edit');
      });
  };
  // console.log(unit?.name);
  return (
    <View style={styles.container}>
      {loadingRoom && <CustomLoading />}
      {modalAddRoom && (
        <CustomModalNotify
          title={'Sửa thông tin phòng'}
          label={'Bạn có muốn sửa thông tin phòng này ?'}
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
            let eachUnit = {...unit, roomType: item?.key};
            setUnit(eachUnit);
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
        label={'Sửa thông tin phòng'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      {unit && (
        <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
          <CustomSuggest
            label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
          />
          <CustomTextTitle label={'Thông tin phòng'} />
          <CustomInput
            important={true}
            type={'button'}
            title={'Tòa nhà'}
            placeholder={'Chọn tòa nhà'}
            value={`${hause?.name}`}
            onPress={() => setModalHauses(true)}
          />
          <CustomInput
            important={true}
            type={'input'}
            styleViewInput={{marginTop: 10}}
            title={'Tầng'}
            placeholder={'Nhập số tầng'}
            keyboardType={'numeric'}
            defaultValue={`${unit?.floorNumber}`}
            onEndEditing={event => {
              let eachUnit = {...unit, floorNumber: event.nativeEvent.text};
              setUnit(eachUnit);
            }}
          />

          <CustomInput
            important={true}
            type={'input'}
            styleViewInput={{marginTop: 10}}
            title={'Tên phòng'}
            placeholder={'Nhập tên phòng'}
            defaultValue={`${unit?.name}`}
            onEndEditing={event => {
              let eachUnit = {...unit, name: event.nativeEvent.text};
              setUnit(eachUnit);
            }}
          />

          <CustomInput
            important={true}
            keyboardType={'numeric'}
            type={'input'}
            styleViewInput={{marginTop: 10}}
            title={'Giá thuê phòng'}
            placeholder={'Nhập giá thuê phòng'}
            defaultValue={`${unit?.rentMonthlyFee}`}
            onEndEditing={event => {
              let eachUnit = {...unit, rentMonthlyFee: event.nativeEvent.text};
              setUnit(eachUnit);
            }}
          />
          <CustomInput
            important={true}
            type={'button'}
            styleViewInput={{marginTop: 10}}
            title={'Loại phòng'}
            placeholder={'Chọn loại phòng'}
            value={`${unit?.roomType}`}
            onPress={() => setModalUnitType(true)}
          />

          <CustomInputValue
            viewContainer={{marginTop: 20}}
            label={'Diện tích'}
            type={'input'}
            placeholder={'Nhập diện tích'}
            keyboardType={'numeric'}
            unit={'m2'}
            defaultValue={`${unit?.area}`}
            onEndEditing={event => {
              let eachUnit = {...unit, area: event.nativeEvent.text};
              setUnit(eachUnit);
            }}
          />

          <CustomInputValue
            viewContainer={{marginTop: 20}}
            label={'Giới hạn số người cho thuê'}
            type={'input'}
            placeholder={'Nhập số người'}
            keyboardType={'numeric'}
            unit={'Người'}
            defaultValue={`${unit?.limitTenantNumber}`}
            onEndEditing={event => {
              let eachUnit = {
                ...unit,
                limitTenantNumber: event.nativeEvent.text,
              };
              setUnit(eachUnit);
            }}
          />

          <CustomInputValue
            viewContainer={{marginTop: 20}}
            important={true}
            label={'Tiền đặt cọc'}
            type={'input'}
            placeholder={'Nhập số tiền cọc khi khách thuê'}
            keyboardType={'numeric'}
            unit={'VNĐ'}
            defaultValue={`${unit?.depositMoney}`}
            onEndEditing={event => {
              let eachUnit = {
                ...unit,
                depositMoney: event.nativeEvent.text,
              };
              setUnit(eachUnit);
            }}
          />

          <Text style={[styles.label, {marginTop: 10}]}>Mô tả</Text>
          <View style={styles.viewTextInput}>
            <TextInput
              placeholder={'Nhập mô tả phòng'}
              multiline
              defaultValue={`${unit?.description}`}
              onEndEditing={event => {
                let eachUnit = {
                  ...unit,
                  description: event.nativeEvent.text,
                };
                setUnit(eachUnit);
              }}
            />
          </View>

          <Text style={[styles.label, {marginTop: 10}]}>
            Lưu ý cho người thuê
          </Text>
          <View style={styles.viewTextInput}>
            <TextInput
              placeholder={'Nhập lưu ý cho người thuê'}
              multiline
              defaultValue={`${unit?.notice}`}
              onEndEditing={event => {
                let eachUnit = {
                  ...unit,
                  notice: event.nativeEvent.text,
                };
                setUnit(eachUnit);
              }}
            />
          </View>

          <View style={styles.line} />
          <CustomTextTitle
            label={'Dịch vụ có phí'}
            labelButton={'Thêm'}
            icon={icons.ic_plus}
            onPress={() => navigation.navigate('Service')}
          />
          <CustomSuggest
            label={
              'Chỉnh sửa dịch vụ phòng sẽ không ảnh hưởng đến dịch vụ của tòa nhà'
            }
          />

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
          <CustomSuggest
            label={
              'Chỉnh sửa tiện ích phòng sẽ không ảnh hưởng đến tiện ích của tòa nhà'
            }
          />

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
            {unit?.images?.length > 0 ? (
              <FlatList
                horizontal
                data={unit?.images}
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
      )}
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
  textPicker: {fontSize: 11, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
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
export default EditRoomInformation;
