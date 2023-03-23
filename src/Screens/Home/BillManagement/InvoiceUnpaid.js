import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  Text,
  ScrollView,
} from 'react-native';
import {icons, colors} from '../../../Constants';
// import {ScrollView} from 'react-native-virtualized-view';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomButtonCarendar from '../../../Components/ComponentHome/CustomButtonCarendar';

const BillUnpaid = props => {
  const [listContract, setListContract] = useState([]);
  const [date, setDate] = useState(new Date());
  const [valueDate, setValueDate] = useState('03-03-2023');

  const renderContract = (item, index) => {
    return <View style={styles.viewContract}></View>;
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomButtonCarendar
        value={valueDate}
        label={'Chọn ngày'}
        icon={icons.ic_calendar}
        onPress={() => {}}
      />
      <CustomTextTitle label={'Hóa đơn chưa thanh toán'} />
      {/* <FlatList
        data={listContract}
        keyExtractor={key => key.contractCode}
        renderItem={({item, index}) => renderContract(item, index)}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({});
export default BillUnpaid;

const FAKE_DATA = [
  {
    contractCode: '#1234567',
    dateOfHire: '09-02-2023',
    expirationDate: '09-02-2025',
    place: 'Tòa nhà D2 - P101',
    creator: 'Nguyễn Hưng',
  },
];
