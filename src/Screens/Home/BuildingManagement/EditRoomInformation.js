import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Alert} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import {colors, icons, images} from '../../../Constants';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import RenderService from '../../../Components/ComponentHome/RenderService';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import ImagePicker from 'react-native-image-crop-picker';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {
  amenityState,
  serviceState,
  updateAmenity,
  updateServices,
} from '../../../Store/slices/commonSlice';
import {
  GetUnitDetailAPi,
  PutUnitApi,
} from '../../../Api/Home/UnitApis/UnitApis';
import {updateStatus} from '../../../Store/slices/statusSlice';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import CustomPickerDay from '../../../Components/CommonComponent/CustomPickerDay';
import {UNITTYPE} from '../../../Resource/DataPicker';
import {
  DeleteImageApi,
  PostImageUnitApi,
} from '../../../Api/Home/FileDataApis/FileDataApis';
import ComponentInput from '../../../Components/CommonComponent/ComponentInput';
import {formatNumber, validateNumber} from '../../../utils/common';
import ComponentButton from '../../../Components/CommonComponent/ComponentButton';
import {StraightLine} from '../../../Components/CommonComponent/LineComponent';
import ComponentRenderImage from '../../../Components/CommonComponent/ComponentRenderImage';

const EditRoomInformation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const unitId = route.params.unitId;
  const houseId = route.params.houseId;
  const tokenStore = useSelector(token);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const dispatch = useDispatch();

  const [unitImages, setUnitImages] = useState([]);

  const [loadingRoom, setLoadingRoom] = useState(true);
  const [modalAddRoom, setModalAddRoom] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalUnitType, setModalUnitType] = useState(false);

  const [unit, setUnit] = useState();

  useEffect(() => {
    const getListData = async () => {
      await GetUnitDetailAPi(tokenStore, unitId)
        .then(async res => {
          if (res?.status == 200) {
            setUnit(res?.data);
            let eachData = res?.data?.amenities;
            dispatch(updateAmenity(eachData));
            let eachDataService = res?.data?.chargeServices;
            dispatch(updateServices(eachDataService));
            setLoadingRoom(false);
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
        eachService.push(item);
      });
    }
    return eachService;
  }, [serviceSelect]);

  const listAmenity = useMemo(() => {
    let eachAmenityIds = [];
    if (amenitySelect.length > 0) {
      amenitySelect.map((item, index) => {
        eachAmenityIds.push(item);
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

  const deleteImage = async imageId => {
    setLoadingRoom(true);
    await DeleteImageApi(tokenStore, imageId)
      .then(res => {
        if (res?.status == 200) {
          setLoadingRoom(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const editInforUnit = async () => {
    setModalAddRoom(false);
    setLoadingRoom(true);
    let data = {
      name: unit?.name,
      floorNumber: parseInt(validateNumber(`${unit?.floorNumber}`)),
      openTime: '',
      rentMonthlyFee: parseInt(validateNumber(`${unit?.rentMonthlyFee}`)),
      roomType: unit?.roomType,
      area: parseInt(validateNumber(`${unit?.area}`)),
      limitTenantNumber: parseInt(validateNumber(`${unit?.limitTenantNumber}`)),
      depositMoney: parseInt(validateNumber(`${unit?.depositMoney}`)),
      description: unit?.description,
      notice: unit?.notice,
      serviceIds: serviceIds,
      amenityIds: amenityIds,
    };
    await PutUnitApi(tokenStore, unitId, data)
      .then(async res => {
        if (res?.status == 200) {
          if (unitImages?.length > 0) {
            await PostImageUnitApi(tokenStore, unitId, unitImages)
              .then(res => {
                if (res?.status == 200) {
                  dispatch(updateStatus('updateRoomInfor'));
                  setLoadingRoom(false);
                  navigation.navigate('FloorInformation', houseId);
                }
              })
              .catch(error => {
                console.log(error, 'img');
              });
          } else {
            dispatch(updateStatus('updateRoomInfor'));
            setLoadingRoom(false);
            navigation.navigate('FloorInformation', houseId);
          }
        }
      })
      .catch(error => {
        console.log(error, 'edit');
      });
  };

  return (
    <View style={styles.container}>
      {loadingRoom && <CustomLoading />}
      {modalAddRoom && (
        <CustomModalNotify
          title={'Sửa thông tin phòng'}
          label={'Bạn có muốn sửa thông tin phòng này ?'}
          modalVisible={modalAddRoom}
          onRequestClose={() => setModalAddRoom(false)}
          pressConfirm={() => editInforUnit()}
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
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      {unit && (
        <ScrollView
          nestedScrollEnabled={true}
          keyboardDismissMode="none"
          style={{paddingHorizontal: 10, paddingTop: 10}}>
          <CustomSuggest
            label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
          />
          <CustomTextTitle label={'Thông tin phòng'} />

          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'input'}
            title={'Tầng'}
            placeholder={'Nhập số tầng'}
            keyboardType={'number-pad'}
            value={`${formatNumber(`${unit?.floorNumber}`)}`}
            onChangeText={text => {
              let eachUnit = {...unit, floorNumber: text};
              setUnit(eachUnit);
            }}
          />
          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'input'}
            title={'Tên phòng'}
            placeholder={'Nhập tên phòng'}
            value={`${unit?.name}`}
            onChangeText={text => {
              let eachUnit = {...unit, name: text};
              setUnit(eachUnit);
            }}
          />
          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'input'}
            title={'Giá thuê phòng'}
            placeholder={'Nhập giá thuê phòng'}
            keyboardType={'number-pad'}
            value={`${formatNumber(`${unit?.rentMonthlyFee}`)}`}
            onChangeText={text => {
              let eachUnit = {...unit, rentMonthlyFee: text};
              setUnit(eachUnit);
            }}
          />
          <ComponentButton
            important={true}
            type={'buttonSelect'}
            viewComponent={{marginTop: 10}}
            title={'Loại phòng'}
            placeholder={'Chọn loại phòng'}
            value={`${unit?.roomType}`}
            onPress={() => setModalUnitType(true)}
          />

          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'inputUnit'}
            title={'Diện tích'}
            placeholder={'Nhập diện tích'}
            keyboardType={'number-pad'}
            unit={'m2'}
            value={`${formatNumber(`${unit?.area}`)}`}
            onChangeText={text => {
              let eachUnit = {...unit, area: text};
              setUnit(eachUnit);
            }}
          />

          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'inputUnit'}
            title={'Giới hạn số người cho thuê'}
            placeholder={'Nhập số người'}
            keyboardType={'number-pad'}
            unit={'Người'}
            value={`${formatNumber(`${unit?.limitTenantNumber}`)}`}
            onChangeText={text => {
              let eachUnit = {...unit, limitTenantNumber: text};
              setUnit(eachUnit);
            }}
          />

          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'inputUnit'}
            title={'Tiền đặt cọc'}
            placeholder={'Nhập số tiền cọc'}
            keyboardType={'number-pad'}
            unit={'VNĐ'}
            value={`${formatNumber(`${unit?.depositMoney}`)}`}
            onChangeText={text => {
              let eachUnit = {...unit, depositMoney: text};
              setUnit(eachUnit);
            }}
          />

          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'inputNote'}
            title={'Mô tả'}
            placeholder={'Nhập mô tả phòng'}
            value={`${unit?.description}`}
            onChangeText={text => {
              let eachUnit = {...unit, description: text};
              setUnit(eachUnit);
            }}
          />

          <ComponentInput
            viewComponent={{marginTop: 10}}
            type={'inputNote'}
            title={'Lưu ý cho người thuê'}
            placeholder={'Nhập lưu ý cho người thuê'}
            value={`${unit?.notice}`}
            onChangeText={text => {
              let eachUnit = {...unit, notice: text};
              setUnit(eachUnit);
            }}
          />

          {StraightLine()}
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
          <View>
            <ScrollView horizontal={true} style={{width: '100%'}}>
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
            </ScrollView>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.textPicker}>Đã chọn </Text>
            <Text style={styles.pickerTotal}>{`${listService.length}`}</Text>
          </View>
          {StraightLine()}

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
          <View>
            <ScrollView horizontal={true} style={{width: '100%'}}>
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
            </ScrollView>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.textPicker}>Đã chọn </Text>
            <Text style={styles.pickerTotal}>{`${listAmenity.length}`}</Text>
          </View>

          {StraightLine()}

          <ComponentRenderImage
            title={'Thêm ảnh phòng'}
            label={'Tải lên ảnh mô tả phòng'}
            labelUpload={'Tải lên ảnh phòng'}
            data={unit?.images}
            deleteButton={true}
            openModal={() => setModalCamera(true)}
            deleteItem={item => {
              if (item?.id) {
                Alert.alert(
                  'Cảnh báo !',
                  'Đây là ảnh đang có trên server, bạn có muốn xóa ?',
                  [
                    {text: 'Cancel', style: 'cancel'},
                    {
                      text: 'OK',
                      onPress: () => {
                        let result = [...unit?.images];
                        let newResult = result.filter(
                          itemResult => itemResult !== item,
                        );
                        let eachResult = {...unit, images: newResult};
                        setUnit(eachResult);
                        deleteImage(item?.id);
                      },
                    },
                  ],
                );
              } else {
                let eachAlbumImg = [...unitImages];
                let newAlbumImg = eachAlbumImg.filter(
                  itemResult => itemResult !== item,
                );
                setUnitImages(newAlbumImg);

                let result = [...unit?.images];
                let newResult = result.filter(
                  itemResult => itemResult !== item,
                );
                let eachResult = {...unit, images: newResult};
                setUnit(eachResult);
              }
            }}
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
  textPicker: {fontSize: 11, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
  },
});
export default EditRoomInformation;
