import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
  Alert,
} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import {ScrollView} from 'react-native-virtualized-view';
import CustomInput from '../../../Components/CommonComponent/CustomInput';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {CreateNewService} from '../../../Api/Home/ServiceApis/ServiceApis';

const AddService = props => {
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const [name, setName] = useState('');
  const [calculateMethod, setCalculateMethod] = useState(0);
  const [calculateUnit, setCalculateUnit] = useState('');
  const [fee, setFee] = useState(0);
  const [description, setDescription] = useState('');
  const createNewService = async () => {
    let data = {
      name: name,
      calculateMethod: calculateMethod,
      calculateUnit: calculateUnit,
      fee: fee,
      description: description,
    };
    await CreateNewService(tokenStore, data)
      .then(res => {
        if (res?.status == 200) {
          Alert.alert('Thành công', 'Tạo dịch vụ thành công', [
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomAppBar
          iconLeft={icons.ic_back}
          pressIconRight={() => navigation.navigate('NotificationScreen')}
          label={'Thêm dịch vụ'}
          iconRight={icons.ic_bell}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
        />
        <ScrollView style={[styles.eachContainer]}>
          <Text style={styles.content}>
            Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ
          </Text>
          <CustomTextTitle label={'Thông tin dịch vụ'} />
          {/* <CustomInput
            type={'button'}
            title={'Loại dịch vụ'}
            placeholder={'Chọn loại dịch vụ'}
          /> */}
          <CustomInput
            important={true}
            styleViewInput={{marginTop: 20}}
            type={'input'}
            title={'Tên dịch vụ'}
            placeholder={'Nhập tên dịch vụ'}
            defaultValue={name}
            onEndEditing={evt => setName(evt.nativeEvent.text)}
          />
          <CustomInput
            important={true}
            styleViewInput={{marginTop: 20}}
            type={'button'}
            title={'Thu phí dựa trên'}
            placeholder={'Lũy tiến theo chỉ số'}
            value={calculateMethod}
          />
          <CustomInput
            important={true}
            styleViewInput={{marginTop: 20}}
            type={'input'}
            title={'Đợn vị đo'}
            placeholder={'Đơn vị đo'}
            defaultValue={calculateUnit}
            onEndEditing={evt => setCalculateUnit(evt.nativeEvent.text)}
          />
          <CustomInput
            important={true}
            styleViewInput={{marginTop: 20}}
            type={'input'}
            title={'Phí dịch vụ'}
            placeholder={'Nhập phí dịch vụ'}
            keyboardType={'numeric'}
            defaultValue={fee}
            onEndEditing={evt => setFee(evt.nativeEvent.text)}
          />
          <Text style={[styles.label, {marginTop: 20}]}>Ghi chú</Text>
          <View style={styles.viewTextInput}>
            <TextInput
              multiline
              placeholder="Nhập ghi chú"
              defaultValue={description}
              onEndEditing={evt => setDescription(evt.nativeEvent.text)}
            />
          </View>
          <View style={{marginBottom: 56}} />
        </ScrollView>

        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Hoàn tất'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => createNewService()}
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
  content: {color: 'rgba(127, 138, 147, 1)', fontSize: 13, fontWeight: '400'},
  label: {fontSize: 15, color: 'rgba(55, 64, 71, 1)', fontWeight: '400'},
  viewTextInput: {
    height: 120,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.borderInput,
    padding: 10,
    backgroundColor: 'white',
  },
});
export default AddService;
