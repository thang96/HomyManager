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
  Alert,
} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import CustomInputValue from '../../../Components/CommonComponent/CustomInputValue';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {uuid} from '../../../utils/uuid';
import CustomInput from '../../../Components/CommonComponent/CustomInput';
import CustomTimeButtons from '../../../Components/CommonComponent/CustomTimeButton';
import CustomModalDateTimePicker from '../../../Components/CommonComponent/CustomModalDateTimePicker';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import ImagePicker from 'react-native-image-crop-picker';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import CustomModalPicker from '../../../Components/CommonComponent/CustomModalPicker';
import CustomPickerDay from '../../../Components/CommonComponent/CustomPickerDay';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import RenderService from '../../../Components/ComponentHome/RenderService';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {GetListHausesApi} from '../../../Api/Home/BuildingApis/BuildingApis';
import {GetListUnitsApi} from '../../../Api/Home/UnitApis/UnitApis';
import {dateToDMY, dateToYMD} from '../../../utils/common';
import {PAYMENTDURATION} from '../../../Resource/DataPicker';
import {GetListAmenitysApi} from '../../../Api/Home/AmenityApis/AmenityApis';
import {GetListServicesApi} from '../../../Api/Home/ServiceApis/ServiceApis';
import {GetListTenantsApi} from '../../../Api/Home/TenantApis/TenantApis';
import {
  amenityState,
  serviceState,
  tenantState,
  updateAmenity,
  updateServices,
  updateTenants,
} from '../../../Store/slices/commonSlice';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import {
  CreateNewContractApi,
  PostImageContractApi,
} from '../../../Api/Home/ContractApis/ContractApis';
import {updateStatus} from '../../../Store/slices/statusSlice';
import CustomNote from '../../../Components/CommonComponent/CustomNote';

const CreateContract = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const tenantSelect = useSelector(tenantState);
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [timeChargeDate, setTimeChargeDate] = useState(new Date());
  const [loadingAddContract, setLoadingAddContract] = useState(true);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startChargeDate, setStartChargeDate] = useState();
  const [paymentDuration, setpaymentDuration] = useState();
  const [leasingFee, setLeasingFee] = useState();
  const [depositMoney, setDepositMoney] = useState();
  const [termAndCondition, setTermAndCondition] = useState();
  const [description, setDescription] = useState();
  const [unitId, setUnitId] = useState();
  const [serviceIds, setServiceIds] = useState([]);
  const [amenityIds, setAmenityIds] = useState([]);
  const [tenantIds, setTenantIds] = useState([]);

  const [albumImage, setAlbumImage] = useState([]);

  const [startDateValue, setStartDateValue] = useState('Chọn ngày');
  const [endDateValue, setEndDateValue] = useState('Chọn ngày');
  const [startChargeDateValue, setStartChargeDateValue] = useState('');
  const [modalStartDate, setModalStartDate] = useState(false);
  const [modalEndDate, setModalEndDate] = useState(false);
  const [modalStartChargeDate, setModalStartChargeDate] = useState(false);
  const [modalPaymentDuration, setModalPaymentDuration] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);

  const [hause, setHause] = useState('');
  const [listHauses, setListHauses] = useState([]);
  const [listUnits, setListUnits] = useState([]);
  const [listService, setListService] = useState([]);
  const [listAmenity, setListAmenity] = useState([]);
  const [listTenant, setListTenant] = useState([]);
  const [modalHause, setModalHause] = useState(false);
  const [modalUnit, setModalUnit] = useState(false);

  useEffect(() => {
    const getListData = async () => {
      await GetListHausesApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            setListHauses(res?.data);
            setLoadingAddContract(false);
          }
        })
        .catch(error => console.log(error));

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

      await GetListTenantsApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let eachData = res?.data;
            let eachArray = [];
            eachData.map((data, index) => {
              let newData = {...data, isCheck: false};
              eachArray.push(newData);
            });
            dispatch(updateTenants(eachArray));
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
    let eachTenants = [];
    if (amenitySelect.length > 0) {
      tenantSelect.map((item, index) => {
        if (item?.isCheck == true) {
          eachTenants.push(item);
        }
      });
      setListTenant(eachTenants);
    }
  }, [serviceSelect, amenitySelect, tenantSelect]);

  useEffect(() => {
    const setListData = () => {
      let eachServiceIds = [];
      let eachAmenityIds = [];
      let eachTenantIds = [];
      listService.map((item, index) => {
        eachServiceIds.push(item?.id);
      });
      listAmenity.map((item, index) => {
        eachAmenityIds.push(item?.id);
      });
      listTenant.map((item, index) => {
        eachTenantIds.push(item?.id);
      });
      setServiceIds(eachServiceIds);
      setAmenityIds(eachAmenityIds);
      setTenantIds(eachTenantIds);
    };
    setListData();
  }, [listService, listAmenity, listTenant]);

  const renderSelectSevice = (item, index) => {
    return <RenderService label={item?.name} value={item?.fee} />;
  };

  const renderSelectAmenity = (item, index) => {
    return <RenderAmenity label={item?.name} />;
  };

  const openCamera = () => {
    setModalCamera(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        const eachResult = [...albumImage, eachImg];
        setAlbumImage(eachResult);
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
        const eachResult = [...albumImage];
        const newResult = eachResult.concat(albumImg);
        setAlbumImage(newResult);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const renderImage = (item, index) => {
    return (
      <View>
        <View style={styles.viewRender}>
          <CustomButton
            onPress={() => {
              let result = [...albumImage];
              let newResult = result.filter(itemResult => itemResult !== item);
              setAlbumImage(newResult);
            }}
            styleButton={styles.customButtonIcon}
            styleIcon={styles.imageStyle}
            icon={icons.ic_cancel}
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
  const getListUnit = async item => {
    setHause(item);
    setModalHause(false);
    let hauseId = item?.id;
    await GetListUnitsApi(tokenStore, hauseId)
      .then(res => {
        if (res?.status == 200) {
          setListUnits(res?.data);
          setLoadingAddContract(false);
        }
      })
      .catch(error => console.log(error.response.data));
  };
  const renderSelectTenant = (item, index) => {
    return (
      <CustomPersonInfor
        styleView={{marginBottom: 10}}
        userName={`${item?.fullName}`}
        phoneNumber={`${item?.phoneNumber}`}
      />
    );
  };

  const createNewContract = async () => {
    setLoadingAddContract(true);
    let data = {
      startDate: startDate,
      endDate: endDate,
      startChargeDate: startChargeDate,
      paymentDuration: parseInt(paymentDuration?.value),
      leasingFee: parseInt(leasingFee),
      depositMoney: parseInt(depositMoney),
      unitId: unitId?.id,
      serviceIds: serviceIds,
      amenityIds: amenityIds,
      tenantIds: tenantIds,
      description: '',
    };
    console.log(data, 'data');
    await CreateNewContractApi(tokenStore, data)
      .then(async res => {
        if (res?.status == 200) {
          console.log(res?.data);
          contractId = res?.data?.id;
          await PostImageContractApi(tokenStore, contractId, albumImage)
            .then(res => {
              if (res?.status == 200) {
                dispatch(updateStatus(true));
                setLoadingAddContract(false);
                navigation.goBack();
              }
            })
            .catch(error => {
              Alert.alert(
                'Cảnh báo!!!',
                'Có lỗi sảy ra,vui lòng liên hệ admin...',
              );
            });
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      {loadingAddContract && <CustomLoading />}
      {modalHause && (
        <CustomModalPicker
          data={listHauses}
          pressClose={() => setModalHause(false)}
          onPressItem={item => getListUnit(item)}
        />
      )}
      {modalUnit && (
        <CustomModalPicker
          data={listUnits}
          pressClose={() => setModalUnit(false)}
          onPressItem={item => {
            setUnitId(item);
            setModalUnit(false);
          }}
        />
      )}
      {modalStartDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalStartDate(false)}
          value={timeStart}
          mode={'date'}
          openPicker={modalStartDate}
          onDateChange={value => {
            setStartDate(dateToYMD(value));
            setStartDateValue(dateToDMY(value));
          }}
          onPress={() => setModalStartDate(false)}
        />
      )}
      {modalEndDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalEndDate(false)}
          value={timeEnd}
          mode={'date'}
          openPicker={modalEndDate}
          onDateChange={value => {
            setEndDate(dateToYMD(value));
            setEndDateValue(dateToDMY(value));
          }}
          onPress={() => setModalEndDate(false)}
        />
      )}
      {modalStartChargeDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalStartChargeDate(false)}
          value={timeChargeDate}
          mode={'date'}
          openPicker={modalStartChargeDate}
          onDateChange={value => {
            setStartChargeDate(dateToYMD(value));
            setStartChargeDateValue(dateToDMY(value));
          }}
          onPress={() => setModalStartChargeDate(false)}
        />
      )}
      {modalPaymentDuration && (
        <CustomPickerDay
          data={PAYMENTDURATION}
          modalVisible={modalPaymentDuration}
          onRequestClose={() => setModalPaymentDuration(false)}
          onPress={item => {
            setpaymentDuration(item);
            setModalPaymentDuration(false);
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
        label={'Tạo hợp đồng'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <CustomSuggest
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />
        <CustomTextTitle label={'Thông tin hợp đồng'} />
        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 10}}
          title={'Tòa nhà'}
          placeholder={'Chọn tòa nhà'}
          value={hause?.name}
          onPress={() => setModalHause(true)}
        />
        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 20}}
          title={'Phòng'}
          placeholder={'Chọn phòng'}
          value={unitId?.name}
          onPress={() => setModalUnit(true)}
        />

        <CustomTimeButtons
          styleContainer={{marginTop: 20}}
          title={'Thời gian hợp đồng'}
          leftLabel={'Từ'}
          rightLabel={'Đến'}
          styleButtonLeft={{marginRight: 5}}
          styleButtonRight={{marginLeft: 5}}
          valueLeft={startDateValue}
          valueRight={endDateValue}
          onPressLeft={() => {
            setStartDate(dateToYMD(timeStart));
            setStartDateValue(dateToDMY(timeStart));
            setModalStartDate(true);
          }}
          onPressRightt={() => {
            setEndDate(dateToYMD(timeEnd));
            setEndDateValue(dateToDMY(timeEnd));
            setModalEndDate(true);
          }}
        />

        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 20}}
          title={'Ngày bắt đầu tính tiền'}
          placeholder={'Chọn ngày'}
          value={startChargeDateValue}
          onPress={() => {
            setStartChargeDate(dateToYMD(timeChargeDate));
            setStartChargeDateValue(dateToDMY(timeChargeDate));
            setModalStartChargeDate(true);
          }}
        />

        <CustomInput
          important={true}
          type={'button'}
          styleViewInput={{marginTop: 20}}
          title={'Kỳ thanh toán tiền phòng'}
          placeholder={`Chọn kỳ thanh toán`}
          value={paymentDuration?.key}
          onPress={() => setModalPaymentDuration(true)}
        />

        <CustomTextTitle label={'Tiền phòng'} />
        <CustomInputValue
          type={'input'}
          label={'Tiền thuê phòng'}
          important={true}
          unit={'VNĐ'}
          placeholder={'Nhập tiền thuê phòng'}
          keyboardType={'numeric'}
          defaultValue={leasingFee}
          onEndEditing={event => setLeasingFee(event.nativeEvent.text)}
        />
        <CustomInputValue
          viewContainer={{marginTop: 20}}
          type={'input'}
          label={'Tiền cọc'}
          important={true}
          unit={'VNĐ'}
          placeholder={'Nhập tiền cọc'}
          keyboardType={'numeric'}
          defaultValue={depositMoney}
          onEndEditing={event => setDepositMoney(event.nativeEvent.text)}
        />

        {/* <View style={styles.line} />

        <CustomTextTitle
          label={'Đại diện người cho thuê'}
          labelButton={'Thêm mới'}
        /> */}

        <View style={styles.line} />

        <CustomTextTitle
          label={'Dịch vụ có phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Service')}
        />

        <CustomSuggest
          label={'Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ'}
        />

        {listService.length > 0 ? (
          <FlatList
            listKey="listService"
            horizontal={false}
            scrollEnabled={false}
            numColumns={2}
            keyExtractor={key => key.id}
            data={listService}
            renderItem={({item, index}) => renderSelectSevice(item, index)}
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
          label={'Chọn tiện ích miễn phí đã có hoặc thêm mới tiện ích'}
        />
        {listAmenity.length > 0 ? (
          <FlatList
            listKey="listAmenity"
            horizontal={false}
            scrollEnabled={false}
            numColumns={3}
            keyExtractor={key => key.id}
            data={listAmenity}
            renderItem={({item, index}) => renderSelectAmenity(item, index)}
          />
        ) : null}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listAmenity.length}`}</Text>
        </View>

        <View style={styles.line} />

        <CustomTextTitle
          label={'Danh sách người thuê'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('TenantList')}
        />
        {listTenant.length > 0 ? (
          <FlatList
            listKey="listTenant"
            horizontal={false}
            scrollEnabled={false}
            numColumns={1}
            keyExtractor={key => key.id}
            data={listTenant}
            renderItem={({item, index}) => renderSelectTenant(item, index)}
          />
        ) : null}

        <View style={styles.line} />

        <CustomTextTitle label={'Thêm ảnh hợp đồng'} />
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
              label={'Tải lên ảnh hợp đồng ( tối đa 10 ảnh )'}
              styleLabel={[styles.title, {marginTop: 5}]}
              disabled={true}
              icon={icons.ic_upload}
              styleIcon={{with: 100, height: 100, alignSelf: 'center'}}
            />
          )}
        </View>

        <CustomButton
          styleButton={[styles.buttonUploadIM]}
          label={'Tải lên ảnh hợp đồng'}
          styleLabel={styles.labelUploadIM}
          onPress={() => setModalCamera(true)}
        />

        <View style={{height: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Tiếp tục'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => createNewContract()}
        />
        <CustomNote
          title={'Điều khoản hợp đồng'}
          placeholder={'Nhập điều khoản hợp đồng'}
        />

        <CustomNote
          title={'Mô tả hợp đồng'}
          placeholder={'Nhập mô tả hợp đồng'}
        />
        <View style={{height: 56}} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
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
  imageStyle: {width: 20, height: 20},
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
    height: 220,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
export default CreateContract;
