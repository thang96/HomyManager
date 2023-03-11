import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomAppBar from '../../Components/CustomAppBar';
import {colors, icons} from '../../Constants';
import CustomInput from '../../Components/CustomInput';
import CustomTextTitle from '../../Components/CustomTextTitle';
import CustomTwoButtonBottom from '../../Components/CustomTwoButtonBottom';
import {useNavigation} from '@react-navigation/native';
const AddExtraFee = props => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Thêm khoản phí'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{marginHorizontal: 10}}>
        <CustomTextTitle label={'Thông tin khoản phí'} />
        <CustomInput
          title={'Tiêu đề'}
          type={'input'}
          placeholder={'Nhập tiêu đề'}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <CustomInput
          styleViewInput={{marginTop: 10}}
          title={'Số tiền'}
          type={'input'}
          placeholder={'Nhập số tiền'}
          value={price}
          onChangeText={text => setPrice(text)}
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
export default AddExtraFee;
