import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import CustomAppBar from '../../Components/CommonComponent/CustomAppBar';
import CustomTextTitle from '../../Components/CommonComponent/CustomTextTitle';
import CustomPersonInfor from '../../Components/CommonComponent/CustomPersonInfor';
import CustomTwoButtonBottom from '../../Components/CommonComponent/CustomTwoButtonBottom';
import {colors, icons} from '../../Constants';
import BoxShowInfor from '../../Components/CommonComponent/BoxShowInfor';
const MarkTheIssue = props => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Đánh dấu sự cố'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10}}>
        <CustomTextTitle label={'Người gửi'} />
        <CustomPersonInfor userName={'Đức Thắng'} phoneNumber={'0943437458'} />
        <CustomTextTitle label={'Địa chỉ'} />
        <View style={{height: 60, flexDirection: 'row'}}>
          <BoxShowInfor label={'Tòa nhà'} content={'Tòa nhà D2'} />
          <View style={{width: 5}} />
          <BoxShowInfor label={'Tầng'} content={'1'} />
        </View>
        <View style={{height: 60, flexDirection: 'row', marginTop: 5}}>
          <BoxShowInfor label={'Phòng'} content={'101'} />
          <View style={{width: 5}} />
          <BoxShowInfor label={'Loại phòng'} content={'Studio'} />
        </View>

        <CustomTextTitle label={'Nội dung'} />
        <BoxShowInfor label={'Phòng'} content={'101'} />
        <View style={{height: 60, flexDirection: 'row', marginTop: 5}}>
          <BoxShowInfor label={'Ngày gửi'} content={'01-02-2023'} />
          <View style={{width: 5}} />
          <BoxShowInfor label={'Gia hạn đến'} content={'01-09-2023'} />
        </View>
        <BoxShowInfor
          styleBox={{marginTop: 5}}
          label={'Phòng'}
          content={'101'}
        />

        <CustomTextTitle label={'Nhân viên khắc phục'} />
        <CustomPersonInfor userName={'Hoàng Nam'} phoneNumber={'0948737412'} />

        <CustomTextTitle label={'Ghi chú từ nhân viên'} />
        <View style={styles.styleInput}>
          <TextInput placeholder="Nhập ghi chú cho người thuê" />
        </View>

        <View style={{height: 56}} />
      </ScrollView>
      <CustomTwoButtonBottom
        styleButtonLeft={styles.styleButtonLeft}
        styleLabelLeft={styles.styleLabelLeft}
        leftLabel={'Hoàn tất'}
        rightLabel={'Tạo hóa đơn'}
        onPressLeft={() => {}}
        onPressRight={() => navigation.navigate('BillOfIssue')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  styleButtonLeft: {
    borderColor: colors.backgroundButton,
    backgroundColor: colors.backgroundButton,
    marginLeft: 5,
  },
  styleLabelLeft: {color: 'white', fontSize: 15, fontWeight: '600'},
  styleInput: {
    height: 120,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: colors.borderInput,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
export default MarkTheIssue;
