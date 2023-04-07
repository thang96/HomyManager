import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {CreateNewService} from '../../../Api/Home/ServiceApis/ServiceApis';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import {updateStatus} from '../../../Store/slices/statusSlice';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import ComponentInput from '../../../Components/CommonComponent/ComponentInput';
import {formatNumber, validateNumber} from '../../../utils/common';

const AddService = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const [loadingService, setLoadingService] = useState('');
  const [modalService, setModalService] = useState('');

  const [name, setName] = useState('');
  const [calculateMethod, setCalculateMethod] = useState(0);
  const [calculateUnit, setCalculateUnit] = useState('');
  const [fee, setFee] = useState(0);
  const [description, setDescription] = useState('');

  const createNewService = async () => {
    setModalService(false);
    setLoadingService(true);
    let data = {
      name: name,
      calculateMethod: calculateMethod,
      calculateUnit: calculateUnit,
      fee: validateNumber(fee),
      description: description,
    };
    await CreateNewService(tokenStore, data)
      .then(res => {
        if (res?.status == 200) {
          dispatch(updateStatus(false));
          setLoadingService(false);
          navigation.goBack();
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loadingService && <CustomLoading />}
      {modalService && (
        <CustomModalNotify
          title={'Tạo mới dịch vụ'}
          label={'Bạn có muốn thêm mới dịch vụ này ?'}
          modalVisible={modalService}
          onRequestClose={() => setModalService(false)}
          pressConfirm={() => createNewService()}
        />
      )}
      <CustomAppBar
        iconLeft={icons.ic_back}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        label={'Thêm dịch vụ'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={[styles.eachContainer]}>
        <CustomSuggest
          label={'Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ'}
        />
        <CustomTextTitle label={'Thông tin dịch vụ'} />

        <ComponentInput
          important={true}
          type={'input'}
          title={'Tên dịch vụ'}
          placeholder={'Nhập tên dịch vụ'}
          value={name}
          onChangeText={text => setName(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'input'}
          title={'Đơn vị đo'}
          placeholder={'Đơn vị đo'}
          value={calculateUnit}
          onChangeText={text => setCalculateUnit(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'inputUnit'}
          unit={'VNĐ'}
          keyboardType={'number-pad'}
          title={'Phí dịch vụ'}
          placeholder={'Nhập phí dịch vụ'}
          value={`${formatNumber(`${fee}`)}`}
          onChangeText={text => setFee(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'inputNote'}
          title={'Ghi chú'}
          placeholder={'Nhập ghi chú'}
          value={description}
          onChangeText={text => setDescription(text)}
        />

        <View style={{marginBottom: 56}} />
      </ScrollView>

      <CustomTwoButtonBottom
        leftLabel={'Trở lại'}
        rightLabel={'Hoàn tất'}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => setModalService(true)}
      />
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
});
export default AddService;
