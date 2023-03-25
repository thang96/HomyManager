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

const breakLine = Array(19).fill('');

const InvoicePaid = props => {
  const {data} = props;
  const [invoiceUnconfirmred, setInvoiceUnconfirmred] = useState([]);
  useEffect(() => {
    setInvoiceUnconfirmred(data);
  }, [props]);

  const renderBillNotCreatedYet = (item, index) => {
    return (
      <View style={styles.viewAroundBill}>
        <View style={[styles.viewBill, {height: 64}]}>
          <View style={styles.viewRowBetween}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.textTotalFee}>{item?.totalFee}</Text>
                <Text style={{fontSize: 13, color: '#374047'}}>{' VNĐ'}</Text>
              </View>
              <CustomSuggest label={item?.name} />
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
            <Text
              style={{
                color: '#374047',
              }}>{`${item?.contract?.unit?.house?.name} - ${item?.contract?.unit?.name}`}</Text>
            <Text style={{color: colors.backgroundOrange}}>
              {item?.status == 0
                ? 'Chưa tạo'
                : item?.status == 1
                ? 'Chưa thanh toán'
                : item?.status == 2
                ? 'Đã thanh toán'
                : ''}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomTextTitle label={'Hóa đơn đã thanh toán'} />
      {invoiceUnconfirmred.length > 0 && (
        <FlatList
          listkey={'invoiceUnconfirmred'}
          data={invoiceUnconfirmred}
          keyExtractor={key => key?.id}
          renderItem={({item, index}) => renderBillNotCreatedYet(item, index)}
        />
      )}
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
  textTotalFee: {
    fontWeight: '600',
    color: colors.mainColor,
    lineHeight: 20,
    fontSize: 15,
  },
});
export default InvoicePaid;
