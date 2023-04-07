import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, LogBox, Alert, ScrollView} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import {colors, icons, images} from '../../../Constants';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import RenderService from '../../../Components/ComponentHome/RenderService';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import ImagePicker from 'react-native-image-crop-picker';
import {StraightLine} from '../../../Components/CommonComponent/LineComponent';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {
  amenityState,
  serviceState,
  updateAmenity,
  updateServices,
  updateTenants,
} from '../../../Store/slices/commonSlice';
import {CreateNewUnitApi} from '../../../Api/Home/UnitApis/UnitApis';
import {updateStatus} from '../../../Store/slices/statusSlice';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import CustomPickerDay from '../../../Components/CommonComponent/CustomPickerDay';
import {UNITTYPE} from '../../../Resource/DataPicker';
import {formatNumber, validateNumber} from '../../../utils/common';
import {PostImageUnitApi} from '../../../Api/Home/FileDataApis/FileDataApis';
import ComponentInput from '../../../Components/CommonComponent/ComponentInput';
import ComponentButton from '../../../Components/CommonComponent/ComponentButton';
import ComponentRenderImage from '../../../Components/CommonComponent/ComponentRenderImage';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';

const AddRoom = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const tokenStore = useSelector(token);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const dispatch = useDispatch();
  const hauseId = route.params;
  const [name, setName] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [rentMonthlyFee, setRentMonthlyFee] = useState('');
  const [area, setArea] = useState('');
  const [limitTenantNumber, setLimitTenantNumber] = useState('');
  const [depositMoney, setDepositMoney] = useState('');
  const [description, setDescription] = useState('');
  const [notice, setNotice] = useState('');
  const [unitImages, setUnitImages] = useState([]);

  const [listService, setListService] = useState([]);
  const [listAmenity, setListAmenity] = useState([]);

  const [loadingRoom, setLoadingRoom] = useState(false);
  const [modalAddRoom, setModalAddRoom] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalUnitType, setModalUnitType] = useState(false);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    dispatch(updateAmenity([]));
    dispatch(updateServices([]));
    dispatch(updateTenants([]));
  }, []);

  useMemo(() => {
    setListService(serviceSelect);
    setListAmenity(amenitySelect);
  }, [serviceSelect, amenitySelect]);

  const renderPaidSevice = (item, index) => {
    return (
      <RenderService
        name={item?.name}
        fee={`${item?.fee}`}
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

  const createNewUnit = async () => {
    setModalAddRoom(false);
    setLoadingRoom(true);
    let eachServiceIds = [];
    let eachAmenityIds = [];
    listService.map((item, index) => {
      eachServiceIds.push(item?.id);
    });
    listAmenity.map((item, index) => {
      eachAmenityIds.push(item?.id);
    });
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
      serviceIds: eachServiceIds,
      amenityIds: eachAmenityIds,
    };
    await CreateNewUnitApi(tokenStore, hauseId, data)
      .then(async res => {
        if (res?.status == 200) {
          let unitId = res?.data?.id;
          if (unitImages?.length > 0) {
            await PostImageUnitApi(tokenStore, unitId, unitImages)
              .then(res => {
                if (res?.status == 200) {
                  dispatch(updateStatus('updateRoom'));
                  navigation.navigate('FloorInformation', hauseId);
                  setLoadingRoom(false);
                }
              })
              .catch(error => {
                console.log(error, 'image');
                setLoadingRoom(false);
                Alert.alert(
                  'Thông báo',
                  `Đã có lỗi sảy ra,vui lòng liên hệ với admin...`,
                );
              });
          } else {
            dispatch(updateStatus('updateRoom'));
            navigation.navigate('FloorInformation', hauseId);
            setLoadingRoom(false);
          }
        }
      })
      .catch(error => {
        console.log(error, 'error create room');
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
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, paddingTop: 10, width: '100%'}}>
        <CustomSuggest
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />

        <CustomTextTitle label={'Thông tin phòng'} />

        <ComponentInput
          important={true}
          keyboardType={'number-pad'}
          type={'input'}
          title={'Tầng'}
          placeholder={'Nhập số tầng'}
          value={floorNumber}
          onChangeText={text => setFloorNumber(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Tên phòng'}
          placeholder={'Nhập tên phòng'}
          value={name}
          onChangeText={text => setName(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          keyboardType={'number-pad'}
          type={'inputUnit'}
          title={'Giá thuê phòng'}
          placeholder={'Nhập giá thuê phòng'}
          value={`${formatNumber(rentMonthlyFee)}`}
          onChangeText={text => setRentMonthlyFee(text)}
          unit={'VNĐ'}
        />
        <ComponentButton
          viewComponent={{marginTop: 10}}
          type={'buttonSelect'}
          title={'Loại phòng'}
          placeholder={'Chọn loại phòng'}
          value={roomType}
          onPress={() => setModalUnitType(true)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          keyboardType={'number-pad'}
          type={'inputUnit'}
          title={'Diện tích'}
          placeholder={'Nhập diện tích'}
          unit={'m2'}
          value={area}
          onChangeText={text => setArea(text)}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          keyboardType={'number-pad'}
          type={'inputUnit'}
          title={'Giới hạn số người cho thuê'}
          placeholder={'Nhập số người'}
          unit={'Người'}
          value={limitTenantNumber}
          onChangeText={text => setLimitTenantNumber(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          keyboardType={'number-pad'}
          type={'inputUnit'}
          title={'Tiền đặt cọc'}
          placeholder={'Nhập số tiền cọc'}
          value={`${formatNumber(depositMoney)}`}
          onChangeText={text => setDepositMoney(text)}
          unit={'VNĐ'}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'inputNote'}
          title={'Mô tả'}
          placeholder={'Nhập mô tả phòng'}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <ComponentInput
          viewComponent={{marginTop: 10}}
          type={'inputNote'}
          title={'Lưu ý cho người thuê'}
          placeholder={'Nhập lưu ý cho người thuê'}
          value={notice}
          onChangeText={text => setNotice(text)}
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
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {listAmenity.length > 0 ? (
              <FlatList
                listKey="listAmenity"
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
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

        <View style={styles.line} />

        <ComponentRenderImage
          title={'Thêm ảnh phòng'}
          label={'Tải lên ảnh phòng (1-6 ảnh)'}
          labelUpload={'Tải lên ảnh phòng'}
          data={unitImages}
          deleteButton={true}
          openModal={() => setModalCamera(true)}
          deleteItem={item => {
            let result = [...unitImages];
            let newResult = result.filter(itemResult => itemResult !== item);
            setUnitImages(newResult);
          }}
        />

        <View style={{height: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Hủy'}
          rightLabel={'Tiếp tục'}
          styleLabelLeft={styles.styleLabelLeft}
          styleButtonLeft={styles.styleButtonLeft}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => setModalAddRoom(true)}
        />
      </ScrollView>
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
  styleLabelLeft: {color: 'orange', fontSize: 15, fontWeight: '600'},
  styleButtonLeft: {
    borderColor: 'orange',
    backgroundColor: 'white',
    marginRight: 5,
  },
});
export default AddRoom;
