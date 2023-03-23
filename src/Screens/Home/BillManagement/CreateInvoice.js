import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {colors, icons} from '../../../Constants';
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
import CustomInputValue from '../../../Components/CommonComponent/CustomInputValue';
import CustomFeeOfInvoice from '../../../Components/ComponentHome/Invoice/CustomFeeOfInvoice';
import {GetActiveContractApi} from '../../../Api/Home/ContractApis/ContractApis';
const CreateInvoice = props => {
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const [loadingAddContract, setLoadingAddContract] = useState(true);
  const [hause, setHause] = useState(null);
  const [unit, setUnit] = useState();
  const [contract, setContract] = useState();
  const [detailUnit, setDetailUnit] = useState();
  console.log(contract);

  const [name, setName] = useState();
  const [leasingFee, setLeasingFee] = useState();
  const [serviceFee, setserviceFee] = useState();
  const [otherFee, setotherFee] = useState();
  const [totalFee, setTotalFee] = useState();
  const [notice, setNotice] = useState();
  const [contractId, setContractId] = useState(null);
  const [invoiceServices, setInvoiceServices] = useState([]);

  const [listChargeServices, setListChargeServices] = useState([]);

  const [listHauses, setListHauses] = useState([]);
  const [listUnits, setListUnits] = useState([]);
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
          setDetailUnit(res?.data);
          setListChargeServices(res?.data?.chargeServices);
          setLoadingAddContract(false);
        }
      })
      .catch(error => console.log(error));
    await GetActiveContractApi(tokenStore, unitId)
      .then(res => {
        if (res?.status == 200) {
          setContract(res?.data);
        } else if (res?.status == 204) {
          Alert.alert(
            'Thông báo',
            'Phòng không có hợp đồng nên không tạo được hóa đơn !',
          );
          setContract(null);
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
        <CustomInput
          important={true}
          type={'input'}
          styleViewInput={{marginTop: 20}}
          title={'Tên hóa đơn'}
          placeholder={'Nhập tên hóa đơn'}
          defaultValue={name}
          onEndEditing={evt => setName(evt.nativeEvent.name)}
        />
        <View style={[styles.shadowView, styles.detailIvoice]}>
          <CustomFeeOfInvoice
            title={'Tiền  phòng:'}
            defaultValue={`${detailUnit?.rentMonthlyFee.toLocaleString()}`}
            unit={'VNĐ'}
          />
        </View>
      </ScrollView>
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
  detailIvoice: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});
export default CreateInvoice;
