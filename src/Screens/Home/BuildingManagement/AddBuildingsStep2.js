import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomTimeButtons from '../../../Components/CommonComponent/CustomTimeButton';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomButtonValue from '../../../Components/CommonComponent/CustomButtonValue';
import {useDispatch, useSelector} from 'react-redux';
import {
  bankAccountState,
  commonState,
  updateBankAccounts,
  updateCommon,
} from '../../../Store/slices/commonSlice';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import CustomPickerDay from '../../../Components/CommonComponent/CustomPickerDay';
import {
  BILLINGDATE,
  PAYMENTDATEFROM,
  PAYMENTDATETO,
} from '../../../Resource/DataPicker';
import CustomStepAppBar from '../../../Components/CommonComponent/CustomStepAppBar';
import CustomBankAccountInfor from '../../../Components/ComponentHome/BankAccount/CustomBankAccountInfor';

const AddBuildingsStep2 = props => {
  const navigation = useNavigation();
  const bankAccountsStore = useSelector(bankAccountState);
  const dispatch = useDispatch();
  const createBuildingInfor = useSelector(commonState);
  const [bank, setBank] = useState(null);

  const [billingDate, setBillingDate] = useState(BILLINGDATE[0]);
  const [paymentDateFrom, setPaymentDateFrom] = useState(PAYMENTDATEFROM[0]);
  const [paymentDateTo, setPaymentDateTo] = useState(PAYMENTDATETO[4]);
  const [bankAccountId, setBankAccountId] = useState([]);

  const [modalbillingDate, setModalbillingDate] = useState(false);
  const [modalpaymentDateFrom, setModalpaymentDateFrom] = useState(false);
  const [modalpaymentDateTo, setModalpaymentDateTo] = useState(false);

  useEffect(() => {
    setBank(bankAccountsStore);
    setBankAccountId(bankAccountsStore?.id);
  }, [bankAccountsStore]);

  const goToStepThree = () => {
    let eachData = {
      ...createBuildingInfor,
      billingDate: billingDate.value,
      paymentDateTo: paymentDateTo.value,
      paymentDateFrom: paymentDateFrom.value,
      bankAccountId: bankAccountId,
    };
    dispatch(updateCommon(eachData));
    navigation.navigate('AddBuildingsStep3');
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {modalbillingDate && (
        <CustomPickerDay
          data={BILLINGDATE}
          modalVisible={modalbillingDate}
          onRequestClose={() => setModalbillingDate(false)}
          onPress={item => {
            setBillingDate(item);
            setModalbillingDate(false);
          }}
        />
      )}
      {modalpaymentDateTo && (
        <CustomPickerDay
          data={PAYMENTDATETO}
          modalVisible={modalpaymentDateTo}
          onRequestClose={() => setModalpaymentDateTo(false)}
          onPress={item => {
            setPaymentDateTo(item);
            setModalpaymentDateTo(false);
          }}
        />
      )}
      {modalpaymentDateFrom && (
        <CustomPickerDay
          data={PAYMENTDATEFROM}
          modalVisible={modalpaymentDateFrom}
          onRequestClose={() => setModalpaymentDateFrom(false)}
          onPress={item => {
            setPaymentDateFrom(item);
            setModalpaymentDateFrom(false);
          }}
        />
      )}

      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomStepAppBar
          iconLeft={icons.ic_back}
          label={'Thiết lập tiền nhà'}
          iconRight={icons.ic_bell}
          pressIconRight={() => navigation.navigate('NotificationScreen')}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
          step={2}
        />
        <ScrollView style={[styles.eachContainer]}>
          <CustomSuggest
            label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
          />

          <CustomTextTitle label={'Thiết lập tiền nhà'} />

          <CustomButtonValue
            important={true}
            icon={icons.ic_down}
            type={'button'}
            title={'Ngày chốt tiền'}
            placeholder={'Chọn ngày'}
            value={billingDate?.key}
            onPress={() => setModalbillingDate(true)}
          />

          <CustomTimeButtons
            styleContainer={{marginTop: 20}}
            title={'Thời gian nộp tiền phòng'}
            leftLabel={'Từ ngày'}
            rightLabel={'Đến ngày'}
            iconLeft={icons.ic_down}
            iconRight={icons.ic_down}
            styleButtonLeft={{marginRight: 5}}
            styleButtonRight={{marginLeft: 5}}
            valueLeft={paymentDateFrom?.value}
            valueRight={paymentDateTo?.value}
            onPressLeft={() => setModalpaymentDateFrom(true)}
            onPressRightt={() => setModalpaymentDateTo(true)}
          />

          <CustomTextTitle
            label={'Thông tin thanh toán'}
            labelButton={'Thêm'}
            icon={icons.ic_plus}
            onPress={() => {
              dispatch(updateStatus(true));
              navigation.navigate('ListPaymentSelect');
            }}
          />
          {bank && (
            <CustomBankAccountInfor
              viewCustom={{marginBottom: 10}}
              imageUrl={bank?.bank?.logo}
              userName={bank?.name}
              accountNo={bank?.accountNo}
            />
          )}
        </ScrollView>
        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Tiếp tục'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => goToStepThree()}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'grey',
    paddingHorizontal: 5,
  },
});
export default AddBuildingsStep2;
