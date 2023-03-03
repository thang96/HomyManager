import {useNavigation} from '@react-navigation/native';
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
import CustomInput from '../../../Components/CustomInput';
import CustomTimeButtons from '../../../Components/CustomTimeButton';
import CustomAppBarStep from '../../../Components/CustomAppBarStep';
import CustomTextTitle from '../../../Components/CustomTextTitle';
import CustomButtonValue from '../../../Components/CustomButtonValue';

const AddBuildingsStep2 = props => {
  const navigation = useNavigation();
  const [toDate, setToDate] = useState('1');
  const [fromDate, setFromDate] = useState('5');
  const [paymentDate, setPaymentDate] = useState('Cuối tháng');

  const [modalToDate, setModalToDate] = useState(false);
  const [modalfromDate, setModalFromDate] = useState(false);
  const [modalpaymentDate, setModalPaymentDate] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {modalToDate && <View />}
      {modalfromDate && <View />}
      {modalpaymentDate && <View />}
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
          <Text style={styles.content}>
            Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc
          </Text>
          <CustomTextTitle label={'Thiết lập tiền nhà'} />

          <CustomButtonValue
            important={true}
            type={'button'}
            title={'Ngày chốt tiền'}
            placeholder={'Chọn ngày'}
            value={paymentDate}
            onPress={() => setModalFromDate(true)}
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
            valueLeft={toDate}
            valueRight={fromDate}
            onPressLeft={() => setModalFromDate(true)}
            onPressRightt={() => setModalToDate(true)}
          />
        </ScrollView>
        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Tiếp tục'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => navigation.navigate('AddBuildingsStep3')}
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
  content: {color: 'rgba(127, 138, 147, 1)', fontSize: 13},
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
  time: {
    backgroundColor: '#ebedee',
    borderRadius: 5,
    color: 'black',
    fontSize: 14,
  },
  title: {fontWeight: 'bold', fontSize: 16, color: '#163a5f'},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default AddBuildingsStep2;
