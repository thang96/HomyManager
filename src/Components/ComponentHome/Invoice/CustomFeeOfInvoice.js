import React from 'react';
import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import {colors, icons} from '../../../Constants';
import CustomButton from '../../CommonComponent/CustomButton';
const CustomFeeOfInvoice = props => {
  const {
    defaultValue,
    onEndEditing,
    fee,
    name,
    calculateUnit,
    totalPrice,
    pressDelete,
  } = props;
  const widthView = Dimensions.get('window').width / 2 - 20;
  return (
    <View style={styles.container}>
      <View style={styles.viewBetween}>
        <Text style={{color: '#374047'}}>{`${name}`}</Text>
        <Text
          style={{color: '#374047'}}>{`Đơn giá: ${fee}/${calculateUnit}`}</Text>
      </View>
      <View style={styles.viewBetween}>
        <View
          style={[
            styles.viewBetween,
            styles.shadowView,
            styles.viewInput,
            {width: widthView},
          ]}>
          <TextInput
            style={{flex: 1}}
            placeholder={'Nhập số lượng'}
            keyboardType={'numeric'}
            defaultValue={defaultValue}
            onEndEditing={onEndEditing}
          />
        </View>
        <View
          style={[
            styles.viewBetween,
            styles.viewInput,
            {width: widthView, paddingHorizontal: 5},
          ]}>
          <View style={{paddingVertical: 3}}>
            <Text style={{fontSize: 12, color: '#5F6E78'}}>Tổng:</Text>
            <Text style={styles.textPrice}>{`${totalPrice} VNĐ`}</Text>
          </View>
          <CustomButton
            icon={icons.ic_trash}
            styleIcon={{width: 30, height: 30}}
            onPress={pressDelete}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {height: 74, width: '100%', marginTop: 10},
  viewBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
  viewInput: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 4,
  },
  textPrice: {
    fontSize: 13,
    color: colors.mainColor,
    fontWeight: '600',
  },
});
export default CustomFeeOfInvoice;
