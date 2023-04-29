import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, Image, ScrollView, Alert} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import {colors, icons, images} from '../../../Constants';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
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
import {
  dateToDMY,
  dateToYMD,
  formatNumber,
  validateNumber,
} from '../../../utils/common';
import {PAYMENTDURATION} from '../../../Resource/DataPicker';
import {
  amenityState,
  serviceState,
  tenantState,
  updateAmenity,
  updateServices,
  updateTenants,
} from '../../../Store/slices/commonSlice';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import {CreateNewContractApi} from '../../../Api/Home/ContractApis/ContractApis';
import {updateStatus} from '../../../Store/slices/statusSlice';
import CustomNote from '../../../Components/CommonComponent/CustomNote';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import ComponentInput from '../../../Components/CommonComponent/ComponentInput';
import ComponentButton from '../../../Components/CommonComponent/ComponentButton';
import {PostImageContractApi} from '../../../Api/Home/FileDataApis/FileDataApis';
import ComponentRenderImage from '../../../Components/CommonComponent/ComponentRenderImage';
import {StraightLine} from '../../../Components/CommonComponent/LineComponent';
import RenderServiceInput from '../../../Components/ComponentHome/Contract/RenderServiceInput';
import CustomButton from '../../../Components/CommonComponent/CustomButton';

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

  const [contractImages, setContractImages] = useState([]);

  const [startDateValue, setStartDateValue] = useState('Chọn ngày');
  const [endDateValue, setEndDateValue] = useState('Chọn ngày');
  const [startChargeDateValue, setStartChargeDateValue] = useState('');
  const [modalStartDate, setModalStartDate] = useState(false);
  const [modalEndDate, setModalEndDate] = useState(false);
  const [modalStartChargeDate, setModalStartChargeDate] = useState(false);
  const [modalPaymentDuration, setModalPaymentDuration] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalCreateContract, setModalCreateContract] = useState(false);

  const [hause, setHause] = useState(null);
  const [listHauses, setListHauses] = useState([]);
  const [listUnits, setListUnits] = useState([]);
  const [listService, setListService] = useState([]);
  const [listAmenity, setListAmenity] = useState([]);
  const [listTenant, setListTenant] = useState([]);
  const [modalHause, setModalHause] = useState(false);
  const [modalUnit, setModalUnit] = useState(false);
  // console.log(listUnits);
  const valueIsReady = () =>
    paymentDuration != null && leasingFee != null && unitId != null;

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
      dispatch(updateAmenity([]));
      dispatch(updateServices([]));
      dispatch(updateTenants([]));
    };
    getListData();
  }, []);

  useMemo(() => {
    let eachService = [];
    if (serviceSelect.length > 0) {
      serviceSelect.map((item, index) => {
        let newItem = {...item, usageAmount: ''};
        eachService.push(newItem);
      });
    }
    setListService(eachService);
  }, [serviceSelect]);

  useMemo(() => {
    let eachAmenityIds = [];
    if (amenitySelect.length > 0) {
      amenitySelect.map((item, index) => {
        if (item?.isCheck == true) {
          eachAmenityIds.push(item);
        }
      });
    }
    setListAmenity(eachAmenityIds);
  }, [amenitySelect]);

  useMemo(() => {
    let eachTenants = [];
    if (tenantSelect.length > 0) {
      tenantSelect.map((item, index) => {
        if (item?.isCheck == true) {
          eachTenants.push(item);
        }
      });
    }
    setListTenant(eachTenants);
  }, [tenantSelect]);

  const renderSelectSevice = (item, index) => {
    return (
      <RenderService
        name={item?.name}
        fee={item?.fee}
        calculateUnit={item?.calculateUnit}
      />
    );
  };

  const renderSelectAmenity = (item, index) => {
    return <RenderAmenity label={item?.name} />;
  };

  const openCamera = () => {
    setModalCamera(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        const eachResult = [...contractImages, eachImg];
        setContractImages(eachResult);
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
        const eachResult = [...contractImages];
        const newResult = eachResult.concat(albumImg);
        setContractImages(newResult);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
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
    setModalCreateContract(false);
    setLoadingAddContract(true);
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
    let data = {
      startDate: startDate,
      endDate: endDate,
      startChargeDate: startChargeDate,
      paymentDuration: parseInt(paymentDuration?.value),
      leasingFee: parseInt(validateNumber(`${leasingFee}`)),
      depositMoney: parseInt(validateNumber(`${depositMoney}`)),
      description: description ?? '',
      termAndCondition: termAndCondition ?? '',
      unitId: unitId?.id,
      serviceIds: eachServiceIds,
      amenityIds: eachAmenityIds,
      tenantIds: eachTenantIds,
    };
    await CreateNewContractApi(tokenStore, data)
      .then(async res => {
        if (res?.status == 200) {
          contractId = res?.data?.id;
          if (contractImages.length > 0) {
            await PostImageContractApi(tokenStore, contractId, contractImages)
              .then(res => {
                if (res?.status == 200) {
                  dispatch(updateStatus('updateContract'));
                  setLoadingAddContract(false);
                  navigation.goBack();
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      {loadingAddContract && <CustomLoading />}
      {modalCreateContract && (
        <CustomModalNotify
          title={'Tạo mới hợp đồng'}
          label={'Bạn có muốn thêm mới hợp đồng này ?'}
          modalVisible={modalCreateContract}
          onRequestClose={() => setModalCreateContract(false)}
          pressConfirm={() => {
            valueIsReady() == true
              ? createNewContract()
              : Alert.alert(
                  'Cảnh báo !!!',
                  'Vui lòng điền đủ thông tin cần thiết',
                );
          }}
        />
      )}
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
            setTimeStart(value);
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
            setTimeEnd(value);
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
            setTimeChargeDate(value);
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
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={{paddingHorizontal: 10, paddingTop: 10}}>
        <CustomSuggest
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />
        <CustomTextTitle label={'Thông tin hợp đồng'} />

        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
          title={'Tòa nhà'}
          placeholder={'Chọn tòa nhà'}
          value={hause?.name}
          onPress={() => setModalHause(true)}
        />
        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
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
        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
          title={'Ngày bắt đầu tính tiền'}
          placeholder={'Chọn ngày'}
          value={startChargeDateValue}
          onPress={() => {
            setStartChargeDate(dateToYMD(timeChargeDate));
            setStartChargeDateValue(dateToDMY(timeChargeDate));
            setModalStartChargeDate(true);
          }}
        />
        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
          title={'Kỳ thanh toán tiền phòng'}
          placeholder={`Chọn kỳ thanh toán`}
          value={paymentDuration?.key}
          onPress={() => setModalPaymentDuration(true)}
        />

        <CustomTextTitle label={'Tiền phòng'} />

        <ComponentInput
          important={true}
          type={'inputUnit'}
          title={'Tiền thuê phòng'}
          placeholder={'Nhập tiền thuê phòng'}
          keyboardType={'number-pad'}
          unit={'VNĐ'}
          value={`${formatNumber(`${leasingFee}`)}`}
          onChangeText={text => setLeasingFee(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'inputUnit'}
          title={'Tiền cọc'}
          placeholder={'Nhập tiền cọc'}
          keyboardType={'number-pad'}
          unit={'VNĐ'}
          value={`${formatNumber(`${depositMoney}`)}`}
          onChangeText={text => setDepositMoney(text)}
        />

        {StraightLine()}
        <CustomTextTitle
          label={'Điều khoản hợp đồng'}
          labelButton={'Xem chi tiết'}
          onPress={() => navigation.navigate('DetailedContractTerms')}
        />
        {/* <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'inputNote'}
          title={'Điều khoản hợp đồng'}
          placeholder={'Nhập điều khoản hợp đồng'}
          value={termAndCondition}
          onChangeText={text => setTermAndCondition(text)}
        /> */}

        <CustomNote
          viewCustom={{marginTop: 10}}
          title={'Điều khoản bổ sung'}
          placeholder={'Nhập điều khoản bổ sung'}
          defaultValue={description}
          onEndEditing={evt => setDescription(evt.nativeEvent.text)}
        />
        {StraightLine()}

        <CustomTextTitle
          label={'Dịch vụ có phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Service')}
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
                renderItem={({item, index}) => renderSelectSevice(item, index)}
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
                renderItem={({item, index}) => renderSelectAmenity(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text style={styles.pickerTotal}>{`${listAmenity.length}`}</Text>
        </View>

        {StraightLine()}

        <CustomTextTitle
          label={'Danh sách người thuê'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('TenantList')}
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
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
          </ScrollView>
        </View>

        {StraightLine()}
        <ComponentRenderImage
          title={'Thêm ảnh hợp đồng'}
          label={'Tải lên ảnh hợp đồng ( tối đa 10 ảnh )'}
          labelUpload={'Tải lên ảnh hợp đồng'}
          data={contractImages}
          deleteButton={true}
          openModal={() => setModalCamera(true)}
          deleteItem={item => {
            let result = [...contractImages];
            let newResult = result.filter(itemResult => itemResult !== item);
            setContractImages(newResult);
          }}
        />

        <View style={{height: 56}} />
        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Tiếp tục'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => setModalCreateContract(true)}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  textPicker: {fontSize: 11, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
  },
});
export default CreateContract;
