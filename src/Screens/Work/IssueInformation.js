import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import CustomAppBar from '../../Components/CustomAppBar';
import CustomTextTitle from '../../Components/CustomTextTitle';
import CustomPersonInfor from '../../Components/CustomPersonInfor';
import CustomTwoButtonBottom from '../../Components/CustomTwoButtonBottom';
import {colors, icons} from '../../Constants';
import BoxShowInfor from '../../Components/CommonComponent/BoxShowInfor';
const IssueInformation = props => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Thông tin sự cố'}
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

        <CustomTextTitle
          label={'Nhân viên khắc phục'}
          labelButton={'Thêm'}
          icon={icons.ic_plus}
        />
        <CustomPersonInfor userName={'Hoàng Nam'} phoneNumber={'0948737412'} />
      </ScrollView>
      <CustomTwoButtonBottom
        styleButtonLeft={styles.styleButtonLeft}
        styleLabelLeft={styles.styleLabelLeft}
        leftLabel={'Đánh dấu'}
        rightLabel={'Hoàn tất'}
        onPressLeft={() => navigation.navigate('MarkTheIssue')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
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
export default IssueInformation;
