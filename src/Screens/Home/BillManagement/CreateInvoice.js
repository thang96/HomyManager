import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {colors, icons} from '../../../Constants';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {StraightLine} from '../../../Components/CommonComponent/LineComponent';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {useNavigation} from '@react-navigation/native';
import CustomModalPicker from '../../../Components/CommonComponent/CustomModalPicker';
import {GetListHausesApi} from '../../../Api/Home/BuildingApis/BuildingApis';
import {
  GetListUnitsApi,
  GetUnitDetailAPi,
} from '../../../Api/Home/UnitApis/UnitApis';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {GetActiveContractApi} from '../../../Api/Home/ContractApis/ContractApis';
import CustomUnitFee from '../../../Components/ComponentHome/Invoice/CustomUnitFee';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import CustomNote from '../../../Components/CommonComponent/CustomNote';
import CustomFeeOfInvoice from '../../../Components/ComponentHome/Invoice/CustomFeeOfInvoice';
import {uuid} from '../../../utils/uuid';
import RenderImage from '../../../Components/ComponentHome/RenderImage';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import ImagePicker from 'react-native-image-crop-picker';
import {serviceState, updateServices} from '../../../Store/slices/commonSlice';
import {updateStatus} from '../../../Store/slices/statusSlice';
import {convertDate, formatNumber, validateNumber} from '../../../utils/common';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import ComponentButton from '../../../Components/CommonComponent/ComponentButton';
import ComponentInput from '../../../Components/CommonComponent/ComponentInput';
import {CreateInvoicesApi} from '../../../Api/Home/InvoiceApis/InvoiceApis';
import {PostImageInvoiceApi} from '../../../Api/Home/FileDataApis/FileDataApis';

const CreateInvoice = props => {
  const dispatch = useDispatch();
  const services = useSelector(serviceState);
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const [loadingAddContract, setLoadingAddContract] = useState(true);
  const [hause, setHause] = useState(null);
  const [unit, setUnit] = useState(null);
  const [contract, setContract] = useState(null);
  // console.log(contract);

  const [listHauses, setListHauses] = useState([]);
  const [listUnits, setListUnits] = useState([]);
  const [modalHause, setModalHause] = useState(false);
  const [modalUnit, setModalUnit] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalCreateInvoice, setModalCreateInvoice] = useState(false);

  const [name, setName] = useState();
  const [serviceFee, setServiceFee] = useState();
  const [otherFee, setOtherFee] = useState();

  const [notice, setNotice] = useState();

  const [invoiceServices, setInvoiceServices] = useState([]);

  const [invoiceImages, setInvoiceImages] = useState([]);

  const [listChargeServices, setListChargeServices] = useState([]);

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
    };
    getListData();
  }, []);

  useEffect(() => {
    let eachData = [];
    for (let index = 0; index < services.length; index++) {
      const element = services[index];
      let newElement = {...element, totalPrice: 0};
      eachData.push(newElement);
    }
    setListChargeServices(eachData);
  }, [services]);

  useEffect(() => {
    let price = 0;
    let eachInvoiceServices = [];
    for (let index = 0; index < listChargeServices.length; index++) {
      const element = listChargeServices[index];
      price += element?.totalPrice;
      let eachElement = {
        chargeServiceId: element?.id,
        chargeServiceName: element?.name,
        calculateUnit: element?.calculateUnit,
        fee: element.fee,
        usageAmount: parseInt(`${element.quantity ? element.quantity : 0}`),
      };
      eachInvoiceServices.push(eachElement);
    }
    setInvoiceServices(eachInvoiceServices);
    setServiceFee(price);
  }, [listChargeServices]);

  const totalFee = useMemo(() => {
    let totalPrice =
      parseInt(otherFee != '' ? otherFee : 0) +
      parseInt(
        `${validateNumber(
          `${contract?.leasingFee ? contract?.leasingFee : 0}`,
        )}`,
      ) +
      parseInt(serviceFee ? serviceFee : 0);
    return totalPrice;
  }, [otherFee, contract, serviceFee]);

  const getListUnit = async item => {
    setHause(item);
    setModalHause(false);
    setLoadingAddContract(true);
    let hauseId = item?.id;
    await GetListUnitsApi(tokenStore, hauseId)
      .then(res => {
        if (res?.status == 200) {
          setUnit(null);
          setContract(null);
          setListUnits(res?.data);
          setLoadingAddContract(false);
        }
      })
      .catch(error => console.log(error));
  };

  const getDetalUnit = async item => {
    let unitId = item?.id;
    setUnit(item);
    setModalUnit(false);
    setLoadingAddContract(true);
    await GetUnitDetailAPi(tokenStore, unitId)
      .then(res => {
        if (res?.status == 200) {
          let chargeServicesData = res?.data?.chargeServices;
          let eachChargeServices = [];
          for (let index = 0; index < chargeServicesData.length; index++) {
            const element = chargeServicesData[index];
            let newElement = {
              ...element,
              totalPrice: 0,
              quantity: '',
              isCheck: true,
            };
            eachChargeServices.push(newElement);
          }
          dispatch(updateServices(eachChargeServices));
        }
      })
      .catch(error => {
        console.log(error);
      });
    await GetActiveContractApi(tokenStore, unitId)
      .then(res => {
        if (res?.status == 200) {
          setContract(res?.data);
          setLoadingAddContract(false);
        } else if (res?.status == 204) {
          setContract(null);
          setLoadingAddContract(false);
          Alert.alert(
            'Thông báo',
            'Phòng không có hợp đồng nên không tạo được hóa đơn !',
          );
          setContract(null);
        }
      })
      .catch(error => console.log(error));
  };

  const openCamera = () => {
    setModalCamera(false);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        const eachResult = [...invoiceImages, eachImg];
        setInvoiceImages(eachResult);
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
        const eachResult = [...invoiceImages];
        const newResult = eachResult.concat(albumImg);
        setInvoiceImages(newResult);
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
          let result = [...invoiceImages];
          let newResult = result.filter(itemResult => itemResult !== item);
          setInvoiceImages(newResult);
        }}
      />
    );
  };
  const renderFeeOfVoice = (item, index) => {
    return (
      <CustomFeeOfInvoice
        pressDelete={() => {
          let eachData = [...listChargeServices];
          let newResult = eachData.filter(itemResult => itemResult !== item);
          setListChargeServices(newResult);
        }}
        calculateUnit={item?.calculateUnit}
        name={item?.name}
        fee={`${formatNumber(`${item?.fee}`)}`}
        totalPrice={`${formatNumber(`${item?.totalPrice}`)}`}
        value={`${formatNumber(`${item?.quantity}`)}`}
        onChangeText={text => {
          let newQuantity = text;
          let newTotalPrice =
            parseInt(`${validateNumber(`${newQuantity ? newQuantity : 0}`)}`) *
            parseInt(`${validateNumber(`${item?.fee}`)}`);
          let newItem = {
            ...item,
            quantity: newQuantity,
            totalPrice: newTotalPrice,
          };
          let eachService = [...listChargeServices];
          eachService[index] = newItem;
          setListChargeServices(eachService);
        }}
      />
    );
  };

  const createInvoice = async () => {
    setModalCreateInvoice(false);
    setLoadingAddContract(true);
    let data = {
      name: name,
      code: 'string',
      status: 0,
      flowStatus: 0,
      leasingFee: parseInt(
        `${validateNumber(
          `${contract?.leasingFee ? contract?.leasingFee : 0}`,
        )}`,
      ),
      serviceFee: parseInt(
        `${validateNumber(`${serviceFee ? serviceFee : 0}`)}`,
      ),
      otherFee: parseInt(`${validateNumber(`${otherFee ? otherFee : 0}`)}`),
      totalFee: parseInt(`${validateNumber(`${totalFee ? totalFee : 0}`)}`),
      notice: notice,
      createTime: '2023-03-25T08:12:58.486Z',
      issuedDate: '2023-03-25T08:12:58.486Z',
      paymentDate: '2023-03-25T08:12:58.486Z',
      contractId: `${contract?.id}`,
      invoiceServices: invoiceServices,
    };
    await CreateInvoicesApi(tokenStore, data)
      .then(async res => {
        if (res?.status == 200) {
          let invoiceId = res?.data?.id;
          if (invoiceImages?.length > 0) {
            await PostImageInvoiceApi(tokenStore, invoiceId, invoiceImages)
              .then(() => {
                if (res?.status == 200) {
                  dispatch(updateStatus('updateInvoice'));
                  setLoadingAddContract(false);
                  navigation.goBack();
                }
              })
              .catch(error => {
                console.log(error, 'PostImageInvoice');
              });
          } else {
            dispatch(updateStatus('updateInvoice'));
            setLoadingAddContract(false);
            navigation.goBack();
          }
        }
      })
      .catch(error => {
        console.log(error, 'create');
      });
  };

  return (
    <View style={styles.container}>
      {loadingAddContract && <CustomLoading />}
      {modalCreateInvoice && (
        <CustomModalNotify
          title={'Tạo hóa đơn'}
          label={'Bạn có muốn tạo hóa đơn này?'}
          onRequestClose={() => setModalCreateInvoice(false)}
          pressConfirm={() => createInvoice()}
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
          onPressItem={item => getDetalUnit(item)}
        />
      )}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Tạo hóa đơn'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        keyboardDismissMode="none"
        nestedScrollEnabled={true}
        style={{paddingHorizontal: 10, paddingTop: 10}}>
        <CustomSuggest
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />
        <CustomTextTitle label={'Thông tin hóa đơn'} />
        <ComponentButton
          important={true}
          type={'buttonSelect'}
          viewComponent={{marginTop: 10}}
          title={'Tòa nhà'}
          placeholder={'Chọn tòa nhà'}
          value={hause?.name}
          onPress={() => setModalHause(true)}
        />
        <ComponentButton
          important={true}
          type={'buttonSelect'}
          viewComponent={{marginTop: 10}}
          title={'Phòng'}
          placeholder={'Chọn phòng'}
          value={unit?.name}
          onPress={() => setModalUnit(true)}
        />
        {contract != null && (
          <View>
            <View style={[styles.shadowView, styles.viewInfor]}>
              <View style={styles.viewRow}>
                <Image
                  source={icons.ic_calendar}
                  style={{width: 20, height: 20, marginRight: 5}}
                />
                <Text
                  style={{
                    color: '#374047',
                    fontSize: 13,
                  }}>
                  {`Từ ${convertDate(contract?.startDate)} đến ${convertDate(
                    contract?.endDate,
                  )}`}
                </Text>
              </View>
              <View style={styles.viewRow}>
                <Image
                  source={icons.ic_home}
                  style={{width: 20, height: 20, marginRight: 5}}
                />
                <Text style={{color: '#374047', fontSize: 13}}>
                  {`${contract?.unit?.house?.name} - ${contract?.unit?.name}`}
                </Text>
              </View>
              <View style={styles.viewRow}>
                <Text style={{color: '#374047', fontSize: 13}}>
                  Chủ hợp đồng:
                </Text>
                <Text
                  style={{color: '#374047', fontSize: 13, fontWeight: '600'}}>
                  {` ${contract?.contractOwner?.fullName}`}
                </Text>
              </View>
            </View>

            <View style={styles.viewLine} />
            <ComponentInput
              important={true}
              type={'input'}
              title={'Tên hóa đơn'}
              placeholder={'Nhập tên hóa đơn'}
              value={name}
              onChangeText={text => setName(text)}
            />
            <CustomUnitFee
              important={true}
              keyboardType={'number-pad'}
              title={'Tiền phòng'}
              placeholder={'0'}
              value={`${formatNumber(`${contract?.leasingFee}`)}`}
              onChangeText={text => {
                let newContract = {...contract, leasingFee: text};
                setContract(newContract);
              }}
            />
            <CustomUnitFee
              title={'Phí khác'}
              keyboardType={'number-pad'}
              placeholder={'0'}
              value={`${formatNumber(`${otherFee}`)}`}
              onChangeText={text => setOtherFee(text)}
            />
            {StraightLine()}

            <CustomTextTitle
              label={'Phí dịch vụ'}
              labelButton={'Thêm'}
              icon={icons.ic_plus}
              onPress={() => navigation.navigate('Service')}
            />
            <View>
              <ScrollView horizontal={true} style={{width: '100%'}}>
                {listChargeServices.length > 0 && (
                  <FlatList
                    listKey="listChargeServices"
                    data={listChargeServices}
                    keyExtractor={key => key?.id}
                    renderItem={({item, index}) =>
                      renderFeeOfVoice(item, index)
                    }
                  />
                )}
              </ScrollView>
            </View>

            {StraightLine()}

            <CustomNote
              title={'Ghi chú'}
              placeholder={'Nhập ghi chú'}
              defaultValue={notice}
              onEndEditing={evnt => setNotice(evnt.nativeEvent.text)}
            />

            {StraightLine()}

            <CustomTextTitle label={'Ảnh dịch vụ'} />
            <View
              style={{
                height: 220,
                marginVertical: 5,
                borderRadius: 10,
                backgroundColor: 'white',
              }}>
              {invoiceImages.length > 0 ? (
                <FlatList
                  horizontal
                  data={invoiceImages}
                  keyExtractor={uuid}
                  renderItem={({item}) => renderImage(item)}
                />
              ) : (
                <CustomButton
                  styleButton={{flex: 1}}
                  label={'Tải lên ảnh dịch vụ'}
                  styleLabel={[styles.title, {marginTop: 5}]}
                  disabled={true}
                  icon={icons.ic_upload}
                  styleIcon={{with: 100, height: 100, alignSelf: 'center'}}
                />
              )}
            </View>
            <CustomButton
              styleButton={[styles.buttonUploadIM]}
              label={'Tải lên ảnh dịch vụ'}
              styleLabel={styles.labelUploadIM}
              onPress={() => setModalCamera(true)}
            />
            <View style={{height: 56}} />
          </View>
        )}
      </ScrollView>

      <CustomTotalPrice totalPrice={`${formatNumber(`${totalFee}`)}`} />
      <CustomTwoButtonBottom
        styleButtonLeft={styles.styleButtonLeft}
        styleLabelLeft={styles.styleLabelLeft}
        leftLabel={'Hủy hóa đơn'}
        rightLabel={'Tạo hóa đơn'}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => setModalCreateInvoice(true)}
      />
    </View>
  );
};

const CustomTotalPrice = props => {
  const {totalPrice} = props;
  return (
    <View style={[styles.viewBetween, {paddingHorizontal: 10}]}>
      <Text style={{color: '#000000'}}>Tổng:</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            color: colors.mainColor,
            fontWeight: '600',
          }}>{`${totalPrice}`}</Text>
        <Text style={{color: '#000000'}}> VNĐ</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  shadowView: {
    margin: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewInfor: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  viewLine: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#97A1A7',
    marginVertical: 20,
  },
  textAddOtherFee: {
    color: colors.mainColor,
    fontWeight: '600',
    fontSize: 17,
  },
  buttonUploadIM: {
    height: 50,
    backgroundColor: colors.mainColor,
    borderRadius: 10,
  },
  labelUploadIM: {color: 'white', fontWeight: '500', fontSize: 15},
  viewBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  styleButtonLeft: {
    borderColor: '#FE7A37',
    backgroundColor: 'white',
    marginRight: 5,
  },
  styleLabelLeft: {color: '#FE7A37', fontSize: 15, fontWeight: '600'},
});
export default CreateInvoice;
