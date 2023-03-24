import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {colors, icons} from '../../../Constants';
import {dateToDMY} from '../../../utils/common';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import {ScrollView} from 'react-native-virtualized-view';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomInput from '../../../Components/CommonComponent/CustomInput';
import {useSelector} from 'react-redux';
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
import CustomModalAddOtherFee from '../../../Components/ComponentHome/Invoice/CustomModalAddOtherFee';
import CustomFeeOfInvoice from '../../../Components/ComponentHome/Invoice/CustomFeeOfInvoice';
import {uuid} from '../../../utils/uuid';
import RenderImage from '../../../Components/ComponentHome/RenderImage';
import CustomModalCamera from '../../../Components/CommonComponent/CustomModalCamera';
import ImagePicker from 'react-native-image-crop-picker';

const CreateInvoice = props => {
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const [loadingAddContract, setLoadingAddContract] = useState(true);
  const [hause, setHause] = useState(null);
  const [unit, setUnit] = useState(null);
  const [contract, setContract] = useState(null);
  // console.log(contract);

  const [otherBills, setOtherBills] = useState([]);
  const [bill, setBill] = useState();
  const [chargeServices, setChargeServices] = useState([]);
  const [listHauses, setListHauses] = useState([]);
  const [listUnits, setListUnits] = useState([]);
  const [modalHause, setModalHause] = useState(false);
  const [modalUnit, setModalUnit] = useState(false);
  const [modalAddFee, setModalAddFee] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);

  const [name, setName] = useState();
  const [leasingFee, setLeasingFee] = useState();
  const [serviceFee, setserviceFee] = useState();
  const [otherFee, setotherFee] = useState();
  const [totalFee, setTotalFee] = useState();
  const [notice, setNotice] = useState();
  const [contractId, setContractId] = useState(null);
  const [invoiceServices, setInvoiceServices] = useState([]);

  const [invoiceImages, setInvoiceImages] = useState([]);

  const [listChargeServices, setListChargeServices] = useState([]);

  useEffect(() => {
    if (bill) {
      let eachOther = [...otherBills, bill];
      setOtherBills(eachOther);
      setBill(null);
    }
  }, [bill]);
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
          console.log(res?.data);
          setListChargeServices(res?.data?.chargeServices);
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
  const startDate = new Date(contract?.startDate);
  const endDate = new Date(contract?.endDate);

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

  return (
    <View style={styles.container}>
      {loadingAddContract && <CustomLoading />}
      {modalCamera && (
        <CustomModalCamera
          openCamera={() => openCamera()}
          openGallery={() => openGallery()}
          modalVisible={modalCamera}
          onRequestClose={() => setModalCamera(false)}
          cancel={() => setModalCamera(false)}
        />
      )}
      {modalAddFee && (
        <CustomModalAddOtherFee
          modalVisible={modalAddFee}
          onRequestClose={() => setModalAddFee(false)}
          pressClose={() => setModalAddFee(false)}
          pressConfirm={otherFee => {
            setBill(otherFee);
            setModalAddFee(false);
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
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <CustomSuggest
          label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
        />
        <CustomTextTitle label={'Thông tin hóa đơn'} />
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
          value={unit?.name}
          onPress={() => setModalUnit(true)}
        />
        {/* {contract != null && ( */}
        <View>
          <View style={[styles.shadowView, styles.viewInfor]}>
            <View style={styles.viewRow}>
              <Image
                source={icons.ic_calendar}
                style={{width: 20, height: 20, marginRight: 5}}
              />
              <Text style={{color: '#374047', fontSize: 13}}>{`Từ ${dateToDMY(
                startDate,
              )} đến ${dateToDMY(endDate)}`}</Text>
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
              <Text style={{color: '#374047', fontSize: 13, fontWeight: '600'}}>
                {` ${contract?.contractOwner?.fullName}`}
              </Text>
            </View>
          </View>

          <View style={styles.viewLine} />
          <CustomInput
            important={true}
            type={'input'}
            title={'Tên hóa đơn'}
            placeholder={'Nhập tên hóa đơn'}
            defaultValue={name}
            onEndEditing={evt => setName(evt.nativeEvent.name)}
          />
          <CustomUnitFee
            important={true}
            title={'Tiền phòng'}
            defaultValue={`${contract?.leasingFee}`}
          />

          <View style={styles.viewLine} />

          <CustomTextTitle label={'Phí dịch vụ'} />
          {otherBills.length > 0 && (
            <FlatList
              data={otherBills}
              keyExtractor={(key, index) => `${key?.name}${index.toString()}`}
              renderItem={({item, index}) => {
                return <CustomFeeOfInvoice title={`${item?.name}`} />;
              }}
            />
          )}
          {listChargeServices.length > 0 && <CustomFeeOfInvoice />}

          <CustomFeeOfInvoice price={3 * 4000} />

          <CustomButton
            label={'Thêm phí khác'}
            styleButton={{marginTop: 20}}
            styleLabel={styles.textAddOtherFee}
            onPress={() => setModalAddFee(true)}
          />

          <View style={styles.viewLine} />

          <CustomNote
            title={'Ghi chú'}
            placeholder={'Nhập ghi chú'}
            defaultValue={''}
            onEndEditing={evnt => {}}
          />

          <View style={styles.viewLine} />

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
          <CustomTotalPrice totalPrice={10000000} />
        </View>
        {/* )} */}
        <View style={{height: 25}} />
      </ScrollView>
    </View>
  );
};

const CustomTotalPrice = props => {
  const {totalPrice} = props;
  return (
    <View style={styles.viewBetween}>
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
});
export default CreateInvoice;
