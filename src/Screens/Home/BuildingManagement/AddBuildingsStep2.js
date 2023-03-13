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
import CustomTwoButtonBottom from '../../../Components/CustomTwoButtonBottom';
import CustomModalDateTimePicker from '../../../Components/CustomModalDateTimePicker';
import {icons, colors} from '../../../Constants';
import CustomSuggest from '../../../Components//CustomSuggest';
import CustomTimeButtons from '../../../Components/CustomTimeButton';
import CustomAppBarStep from '../../../Components/CustomAppBarStep';
import CustomTextTitle from '../../../Components/CustomTextTitle';
import CustomButtonValue from '../../../Components/CustomButtonValue';
import {useDispatch, useSelector} from 'react-redux';
import {commonState, updateCommon} from '../../../Store/slices/commonSlice';
import CustomPickerDay from '../../../Components/CommonComponent/CustomPickerDay';
import {
  BILLINGDATE,
  PAYMENTDATEFROM,
  PAYMENTDATETO,
} from '../../../Resource/DataPicker';

const AddBuildingsStep2 = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const createBuildingInfor = useSelector(commonState);

  const [billingDate, setBillingDate] = useState(BILLINGDATE[0]);
  const [paymentDateFrom, setPaymentDateFrom] = useState(PAYMENTDATEFROM[0]);
  const [paymentDateTo, setPaymentDateTo] = useState(PAYMENTDATETO[4]);

  const [modalbillingDate, setModalbillingDate] = useState(false);
  const [modalpaymentDateFrom, setModalpaymentDateFrom] = useState(false);
  const [modalpaymentDateTo, setModalpaymentDateTo] = useState(false);

  const goToStepThree = () => {
    let eachData = {
      ...createBuildingInfor,
      billingDate: billingDate.value,
      paymentDateTo: paymentDateTo.value,
      paymentDateFrom: paymentDateFrom.value,
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
        <CustomAppBarStep
          iconLeft={icons.ic_back}
          label={'Thiết lập tiền nhà'}
          iconRight={icons.ic_bell}
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
