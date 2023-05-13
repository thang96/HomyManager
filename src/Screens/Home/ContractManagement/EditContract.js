import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GetContractDetailAPi,
  PutContractAPi,
} from '../../../Api/Home/ContractApis/ContractApis';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {colors, icons} from '../../../Constants';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import {
  dateToDMY,
  dateToYMD,
  formatNumber,
  validateNumber,
} from '../../../utils/common';
import ComponentInput from '../../../Components/CommonComponent/ComponentInput';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import ComponentButton from '../../../Components/CommonComponent/ComponentButton';
import CustomTimeButtons from '../../../Components/CommonComponent/CustomTimeButton';
import {StraightLine} from '../../../Components/CommonComponent/LineComponent';
import ComponentRenderImage from '../../../Components/CommonComponent/ComponentRenderImage';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import RenderServiceInput from '../../../Components/ComponentHome/Contract/RenderServiceInput';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import {
  amenityState,
  serviceState,
  tenantState,
} from '../../../Store/slices/commonSlice';
import CustomModalDateTimePicker from '../../../Components/CommonComponent/CustomModalDateTimePicker';
import {PAYMENTDURATION} from '../../../Resource/DataPicker';
import CustomPickerDay from '../../../Components/CommonComponent/CustomPickerDay';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import ImagePicker from 'react-native-image-crop-picker';
import {
  DeleteImageApi,
  PostImageContractApi,
} from '../../../Api/Home/FileDataApis/FileDataApis';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import {updateStatus} from '../../../Store/slices/statusSlice';

const EditContract = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const contractId = route.params;
  const tokenStore = useSelector(token);
  const [contract, setContract] = useState();
  const [loading, setLoading] = useState(true);
  const serviceSelect = useSelector(serviceState);
  const amenitySelect = useSelector(amenityState);
  const tenantSelect = useSelector(tenantState);

  const [modalStartDate, setModalStartDate] = useState(false);
  const [modalEndDate, setModalEndDate] = useState(false);
  const [modalStartChargeDate, setModalStartChargeDate] = useState(false);
  const [modalPaymentDuration, setModalPaymentDuration] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalEditContract, setModalEditContract] = useState(false);

  const [contractImages, setContractImages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await GetContractDetailAPi(tokenStore, contractId)
        .then(res => {
          if (res?.status == 200) {
            let dataResponse = res?.data;
            let eachStartDate = new Date(dataResponse?.startDate);
            let eachEndDate = new Date(dataResponse?.endDate);
            let eachStartChargeDate = new Date(dataResponse?.startChargeDate);
            let startDateValue = dateToDMY(eachStartDate);
            let endDateValue = dateToDMY(eachEndDate);
            let startChargeDateValue = dateToDMY(eachStartChargeDate);
            setContractImages(res?.data?.images);
            setContract({
              ...dataResponse,
              startDateValue,
              endDateValue,
              startChargeDateValue,
            });
            setLoading(false);
          }
        })
        .catch(error => {
          alert(error);
        });
    };
    getData();
  }, []);

  useMemo(() => {
    let eachService = [];
    if (serviceSelect.length > 0) {
      serviceSelect.map((item, index) => {
        let eachItem = {...item};
        let newItem = {
          chargeService: {
            calculateUnit: eachItem?.calculateUnit,
            description: eachItem?.description,
            fee: eachItem?.fee,
            isProgressive: eachItem?.isProgressive,
            name: eachItem?.name,
          },
          id: eachItem?.id,
          initUsageAmount: eachItem?.initUsageAmount,
          isActive: eachItem?.isActive,
        };
        eachService.push(newItem);
      });
    }
    let eachContract = {...contract, chargeServices: eachService};
    setContract(eachContract);
  }, [serviceSelect]);

  useMemo(() => {
    let eachAmenity = [];
    if (amenitySelect.length > 0) {
      amenitySelect.map((item, index) => {
        if (item?.isCheck == true) {
          eachAmenity.push(item);
        }
      });
    }
    let eachContract = {...contract, amenities: eachAmenity};
    setContract(eachContract);
  }, [amenitySelect]);

  useMemo(() => {
    let eachTenant = [];
    if (tenantSelect.length > 0) {
      tenantSelect.map((item, index) => {
        if (item?.isCheck == true) {
          eachTenant.push(item);
        }
      });
    }
    let eachContract = {...contract, tenants: eachTenant};
    setContract(eachContract);
  }, [tenantSelect]);

  const renderSelectTenant = (item, index) => {
    return (
      <CustomPersonInfor
        styleView={{marginBottom: 10}}
        userName={`${item?.fullName}`}
        phoneNumber={`${item?.phoneNumber}`}
        avatar={item?.avatarImage?.fileUrl}
      />
    );
  };

  const renderSelectSevice = (item, index) => {
    return (
      <RenderServiceInput
        viewComponent={{marginBottom: 10}}
        isProgressive={item?.isProgressive}
        placeholder={'Nhập chỉ số ban đầu'}
        name={item?.chargeService?.name}
        fee={item?.chargeService?.fee}
        calculateUnit={item?.chargeService?.calculateUnit}
        value={`${formatNumber(`${item?.initUsageAmount}` ?? '')}`}
        onChangeText={text => {
          let eachContract = {...contract};
          let eachService = eachContract?.chargeServices;
          eachService[index] = {...item, initUsageAmount: text};
          let newContract = {...contract, chargeService: eachService};
          setContract(newContract);
        }}
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

  const deleteImage = async item => {
    if (typeof item?.fileUrl == 'string') {
      Alert.alert(
        'Lưu ý',
        'Ảnh này đang được lưu trên hệ thống,bạn có muốn xóa ảnh này?',
        [
          {
            text: 'Hủy',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Xóa',
            onPress: async () => {
              setLoading(true);
              await DeleteImageApi(tokenStore, item?.id).then(res => {
                if (res?.status == 200) {
                  let result = [...contractImages];
                  let newResult = result.filter(
                    itemResult => itemResult !== item,
                  );
                  setContractImages(newResult);
                  setLoading(false);
                } else {
                  Alert.alert('Cảnh báo', 'Có lỗi xảy ra,không xóa được ảnh!');
                  setLoading(false);
                }
              });
            },
          },
        ],
      );
    } else {
      let result = [...contractImages];
      let newResult = result.filter(itemResult => itemResult !== item);
      setContractImages(newResult);
    }
  };

  const warning = () => {
    setModalEditContract(false);
    Alert.alert('Cảnh báo !!!', 'Vui lòng điền đủ thông tin cần thiết');
  };

  const valueIsReady = () =>
    contract?.startDate != null &&
    contract?.endDate != null &&
    contract?.startChargeDate != null &&
    contract?.paymentDuration != null &&
    contract?.leasingFee != null &&
    contract?.depositMoney != null;

  const createNewContract = async () => {
    setModalEditContract(false);
    setLoading(true);
    let eachServiceIds = [];
    let eachAmenityIds = [];
    let eachTenantIds = [];
    contract?.chargeServices?.map((item, index) => {
      let serviceId = {
        id: item?.id,
        initUsageAmount: parseInt(
          `${validateNumber(`${item?.initUsageAmount ?? '0'}`)}`,
        ),
      };
      eachServiceIds.push(serviceId);
    });
    contract?.amenities?.map((item, index) => {
      eachAmenityIds.push(item?.id);
    });
    contract?.tenants?.map((item, index) => {
      eachTenantIds.push(item?.id);
    });
    let data = {
      startDate: contract?.startDate,
      endDate: contract?.endDate,
      startChargeDate: contract?.startChargeDate,
      paymentDuration: parseInt(`${contract?.paymentDuration}`),
      leasingFee: parseInt(`${validateNumber(`${contract?.leasingFee}`)}`),
      depositMoney: parseInt(`${validateNumber(`${contract?.depositMoney}`)}`),
      description: contract?.description ?? '',
      termAndCondition: contract?.termAndCondition ?? '',
      status: contract?.status,
      unitId: contract?.unit?.id,
      serviceIds: eachServiceIds,
      amenityIds: eachAmenityIds,
      tenantIds: eachTenantIds,
    };

    await PutContractAPi(tokenStore, data, contractId)
      .then(async res => {
        if (res?.status == 200) {
          if (contractImages.length > 0) {
            await PostImageContractApi(tokenStore, contractId, contractImages)
              .then(res => {
                if (res?.status == 200) {
                  dispatch(updateStatus('EditContractSuccess'));
                  navigation.goBack();
                  setLoading(false);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        } else {
          Alert.alert('Lỗi', 'Có lỗi sảy ra,vui lòng thử lại !');
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      {loading && <CustomLoading />}
      {modalEditContract && (
        <CustomModalNotify
          title={'Chỉnh sửa hợp đồng'}
          label={'Bạn có muốn chỉnh sửa hợp đồng này ?'}
          modalVisible={modalEditContract}
          onRequestClose={() => setModalEditContract(false)}
          pressConfirm={() => {
            valueIsReady() == true ? createNewContract() : warning();
          }}
        />
      )}
      {modalStartDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalStartDate(false)}
          value={new Date(contract?.startDate)}
          mode={'date'}
          openPicker={modalStartDate}
          onDateChange={value => {
            let eachContract = {
              ...contract,
              startDateValue: dateToDMY(value),
              startDate: dateToYMD(value),
            };
            setContract(eachContract);
          }}
          onPress={() => setModalStartDate(false)}
        />
      )}
      {modalEndDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalEndDate(false)}
          value={new Date(contract?.endDate)}
          mode={'date'}
          openPicker={modalEndDate}
          onDateChange={value => {
            let eachContract = {
              ...contract,
              endDateValue: dateToDMY(value),
              endDate: dateToYMD(value),
            };
            setContract(eachContract);
          }}
          onPress={() => setModalEndDate(false)}
        />
      )}
      {modalStartChargeDate && (
        <CustomModalDateTimePicker
          onCancel={() => setModalStartChargeDate(false)}
          value={new Date(contract?.startChargeDate)}
          mode={'date'}
          openPicker={modalStartChargeDate}
          onDateChange={value => {
            let eachContract = {
              ...contract,
              startChargeDateValue: dateToDMY(value),
              startChargeDate: dateToYMD(value),
            };
            setContract(eachContract);
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
            let eachContract = {
              ...contract,
              paymentDuration: item?.value,
            };
            setContract(eachContract);
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
        label={'Chỉnh sửa hợp đồng'}
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
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Phòng'}
          placeholder={'Chọn phòng'}
          value={contract?.unit?.name}
          editable={false}
        />

        <CustomTimeButtons
          important={true}
          styleContainer={{marginTop: 20}}
          title={'Thời hạn'}
          leftLabel={'Từ'}
          rightLabel={'Đến'}
          styleButtonLeft={{marginRight: 5}}
          styleButtonRight={{marginLeft: 5}}
          valueLeft={`${contract?.startDateValue}`}
          valueRight={`${contract?.endDateValue}`}
          onPressLeft={() => {
            setModalStartDate(true);
          }}
          onPressRightt={() => {
            setModalEndDate(true);
          }}
        />
        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
          title={'Ngày bắt đầu tính tiền'}
          placeholder={'Chọn ngày'}
          value={`${contract?.startChargeDateValue}`}
          onPress={() => {
            setModalStartChargeDate(true);
          }}
        />
        <ComponentButton
          type={'buttonSelect'}
          important={true}
          viewComponent={{marginTop: 10}}
          title={'Kỳ thanh toán tiền phòng'}
          placeholder={`Chọn kỳ thanh toán`}
          value={`${contract?.paymentDuration} Tháng`}
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
          value={`${formatNumber(`${contract?.leasingFee}`)}`}
          onChangeText={text => {
            let newData = {...contract, leasingFee: text};
            setContract(newData);
          }}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'inputUnit'}
          title={'Tiền cọc'}
          placeholder={'Nhập tiền cọc'}
          keyboardType={'number-pad'}
          unit={'VNĐ'}
          value={`${formatNumber(`${contract?.depositMoney}`)}`}
          onChangeText={text => {
            let newData = {...contract, depositMoney: text};
            setContract(newData);
          }}
        />

        {StraightLine()}
        <CustomTextTitle
          label={'Điều khoản hợp đồng'}
          labelButton={'Xem chi tiết'}
          onPress={() => navigation.navigate('DetailedContractTerms')}
        />
        {StraightLine()}

        <CustomTextTitle
          label={'Danh sách người ở'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('TenantList')}
        />
        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {contract?.tenants?.length > 0 ? (
              <FlatList
                listKey="listTenant"
                horizontal={false}
                scrollEnabled={false}
                numColumns={1}
                keyExtractor={key => key.id}
                data={contract?.tenants}
                renderItem={({item, index}) => renderSelectTenant(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        {StraightLine()}

        <CustomTextTitle
          label={'Dịch vụ có phí'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
          onPress={() => navigation.navigate('Service')}
        />

        <View>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            {contract?.chargeServices?.length > 0 ? (
              <FlatList
                listKey="listService"
                horizontal={false}
                scrollEnabled={false}
                numColumns={1}
                keyExtractor={key => key.id}
                data={contract?.chargeServices}
                renderItem={({item, index}) => renderSelectSevice(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text
            style={
              styles.pickerTotal
            }>{`${contract?.chargeServices?.length}`}</Text>
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
            {contract?.amenities?.length > 0 ? (
              <FlatList
                listKey="listAmenity"
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={key => key.id}
                data={contract?.amenities}
                renderItem={({item, index}) => renderSelectAmenity(item, index)}
              />
            ) : null}
          </ScrollView>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textPicker}>Đã chọn </Text>
          <Text
            style={styles.pickerTotal}>{`${contract?.amenities?.length}`}</Text>
        </View>

        {StraightLine()}
        <ComponentRenderImage
          title={'Ảnh hợp đồng'}
          label={'Thêm ảnh hợp đồng'}
          labelUpload={'Thêm ảnh'}
          data={contractImages}
          deleteButton={true}
          openModal={() => setModalCamera(true)}
          deleteItem={item => deleteImage(item)}
        />
        <View style={{height: 56}} />
      </ScrollView>
      <CustomTwoButtonBottom
        styleButtonLeft={styles.styleButtonLeft}
        styleLabelLeft={styles.styleLabelLeft}
        leftLabel={'Hủy'}
        rightLabel={'Hoàn tất'}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => setModalEditContract(true)}
      />
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
  styleButtonLeft: {
    borderColor: 'rgba(254, 122, 55, 1)',
    backgroundColor: 'white',
    marginLeft: 5,
  },
  styleLabelLeft: {
    color: 'rgba(254, 122, 55, 1)',
    fontSize: 15,
    fontWeight: '600',
  },
});
export default EditContract;
