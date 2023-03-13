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
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import CustomButtonCarendar from '../../../Components/CustomButtonCarendar';

const breakLine = Array(19).fill('');

const BillNotCreatedYet = props => {
  const [listBill, setListBill] = useState(FAKE_DATA);
  const [date, setDate] = useState(new Date());
  const [valueDate, setValueDate] = useState('03-03-2023');

  const renderBillNotCreatedYet = (item, index) => {
    return (
      <View style={styles.viewAroundBill}>
        <View style={[styles.viewBill, {height: 64}]}>
          <View style={styles.viewRowBetween}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: '600',
                    color: colors.mainColor,
                    lineHeight: 20,
                    fontSize: 15,
                  }}>
                  {item?.price}
                </Text>
                <Text style={{fontSize: 13, color: '#374047'}}>{' VNĐ'}</Text>
              </View>
              <CustomSuggest label={item?.note} />
            </View>
            <CustomButton
              label={'Xem'}
              styleLabel={styles.labelShow}
              styleButton={styles.buttonShow}
            />
          </View>
        </View>
        <View style={styles.viewLine}>
          {breakLine.map((line, index) => {
            return <View style={styles.line} />;
          })}
        </View>
        <View style={[styles.viewBill, {height: 40}]}>
          <View style={styles.viewRowBetween}>
            <Text style={{color: '#374047'}}>{item?.place}</Text>
            <Text style={{color: colors.backgroundOrange}}>{item?.status}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomButtonCarendar
        value={valueDate}
        label={'Chọn ngày'}
        icon={icons.ic_calendar}
        onPress={() => {}}
      />

      <CustomTextTitle label={'Hóa đơn chưa tạo'} />
      <FlatList
        data={listBill}
        keyExtractor={key => key.id.toString()}
        renderItem={({item, index}) => renderBillNotCreatedYet(item, index)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  viewAroundBill: {height: 106, marginBottom: 15},
  viewBill: {
    backgroundColor: 'white',
    margin: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 8,
    padding: 5,
  },
  viewRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonShow: {
    backgroundColor: colors.mainColor,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
  },
  labelShow: {color: 'white', fontWeight: '600'},
  viewLine: {
    height: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    top: 63.28,
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    zIndex: 1,
    overflow: 'hidden',
  },
  line: {
    height: 1,
    width: 16,
    backgroundColor: colors.borderInput,
    marginLeft: 10,
  },
});
export default BillNotCreatedYet;

const FAKE_DATA = [
  {
    price: 2000000,
    note: 'Hóa đơn tháng 3',
    place: 'Tòa nhà D2 - P101',
    status: 'Chưa tạo',
    id: 1,
  },
  {
    price: 2000000,
    note: 'Hóa đơn tháng 3',
    place: 'Tòa nhà D2 - P101',
    status: 'Chưa tạo',
    id: 2,
  },
  {
    price: 2000000,
    note: 'Hóa đơn tháng 3',
    place: 'Tòa nhà D2 - P101',
    status: 'Chưa tạo',
    id: 3,
  },
  {
    price: 2000000,
    note: 'Hóa đơn tháng 3',
    place: 'Tòa nhà D2 - P101',
    status: 'Chưa tạo',
    id: 4,
  },
  {
    price: 2000000,
    note: 'Hóa đơn tháng 3',
    place: 'Tòa nhà D2 - P101',
    status: 'Chưa tạo',
    id: 5,
  },
];
