import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomNote from '../../Components/CommonComponent/CustomNote';
import CustomTextTitle from '../../Components/CommonComponent/CustomTextTitle';
import CustomTwoButtonBottom from '../../Components/CommonComponent/CustomTwoButtonBottom';
import CustomAppBar from '../../Components/CommonComponent/CustomAppBar';
import CustomButton from '../../Components/CommonComponent/CustomButton';
import {colors, icons} from '../../Constants';
const arrayLine = Array(20).fill('');
const BillOfIssue = props => {
  const navigation = useNavigation();
  const [note, setNote] = useState('');

  const [supplies, setSupplies] = useState([
    {title: 'Đèn điện', price: 50000},
    {title: 'Điều hòa', price: 5600000},
  ]);

  const [totalMoney, setTotalMoney] = useState(0);
  useEffect(() => {
    let total = 0;
    for (let index = 0; index < supplies.length; index++) {
      const price = supplies[index].price;
      total += price;
    }
    setTotalMoney(total);
  }, [supplies]);

  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Hóa đơn sự cố'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        <View style={[styles.shadowView, styles.styleBill]}>
          <View style={styles.viewBetween}>
            <View>
              <Text style={styles.title}>Hóa đơn sự cố</Text>
              <Text style={styles.content}>{`#12345`}</Text>
            </View>
            <Text style={styles.content}>{`14:00 12-03-2023`}</Text>
          </View>
          <View style={[{flexDirection: 'row'}, {marginTop: 10}]}>
            <Image source={icons.ic_home} style={styles.icon} />
            <Text style={styles.label}>Tòa nhà D2 - P101</Text>
          </View>
          <View style={[{flexDirection: 'row'}, {marginTop: 10}]}>
            <Image source={icons.ic_location} style={styles.icon} />
            <Text style={styles.label}>
              448 Lê Văn Việt, Tăng Nhơn Phú A, TP. Thủ Đức
            </Text>
          </View>
          <View style={styles.viewRow}>
            {arrayLine.map((item, index) => {
              return (
                <View key={`${index.toString()}`} style={styles.breakLine} />
              );
            })}
          </View>
          {supplies.map((item, index) => {
            return (
              <View
                key={`${item.title}${index.toString()}`}
                style={styles.viewBetween}>
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.title}>{`${item?.price} VNĐ`}</Text>
              </View>
            );
          })}
          <CustomButton
            label={'Thêm khoản phí'}
            styleLabel={{color: colors.mainColor}}
            styleButton={styles.buttonAddSupplies}
            onPress={() => navigation.navigate('AddExtraFee')}
          />
          <View style={styles.viewRow}>
            {arrayLine.map((item, index) => {
              return (
                <View key={`${index.toString()}`} style={styles.breakLine} />
              );
            })}
          </View>
          <View style={styles.viewBetween}>
            <Text style={styles.title}>Tổng</Text>
            <Text style={styles.title}>{`${totalMoney} VNĐ`}</Text>
          </View>
        </View>
        <CustomTextTitle label={'Ghi chú hóa đơn'} />
        <CustomNote
          title={'Ghi chú'}
          placeholder={'Nhập ghi chú cho hóa đơn'}
          value={note}
          onChangeText={text => setNote(text)}
        />
      </ScrollView>
      <CustomTwoButtonBottom
        styleButtonLeft={styles.styleButtonLeft}
        styleLabelLeft={styles.styleLabelLeft}
        leftLabel={'Hủy'}
        rightLabel={'Gửi hóa đơn'}
        onPressRight={() => {}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  shadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 1,
  },
  styleBill: {
    backgroundColor: 'white',
    minHeight: 330,
    borderRadius: 8,
    padding: 10,
  },
  viewBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {color: 'rgba(0, 0, 0, 1)', fontWeight: '600', fontSize: 16},
  content: {color: 'rgba(0, 0, 0, 1)', fontSize: 12},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {width: 24, height: 24, marginRight: 10},
  label: {color: 'rgba(0, 0, 0, 1)', fontSize: 13},
  breakLine: {height: 1, width: 10, backgroundColor: 'grey', marginRight: 10},
  buttonAddSupplies: {
    borderWidth: 2,
    borderColor: colors.mainColor,
    height: 44,
    borderRadius: 4,
  },
  styleButtonLeft: {
    borderColor: colors.backgroundOrange,
    backgroundColor: 'white',
    marginRight: 5,
  },
  styleLabelLeft: {
    color: colors.backgroundOrange,
    fontSize: 15,
    fontWeight: '600',
  },
});
export default BillOfIssue;
