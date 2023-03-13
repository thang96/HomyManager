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
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomTwoButtonBottom from '../../../Components/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import {ScrollView} from 'react-native-virtualized-view';
import CustomInput from '../../../Components/CustomInput';
import CustomTextTitle from '../../../Components/CustomTextTitle';
import {CreateNewAmenityApi} from '../../../Api/Home/AmenityApis/AmenityApis';
import {useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';

const AddUtilities = props => {
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createNewAmenity = async () => {
    let data = {name: name, description: description};
    await CreateNewAmenityApi(tokenStore, data)
      .then(res => {
        if (res?.status == 200) {
          if (res?.status == 200) {
            Alert.alert('Thành công', 'Tạo tiện ích thành công', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('UtilitiesManager'),
              },
            ]);
          }
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomAppBar
          iconLeft={icons.ic_back}
          label={'Thêm tiện ích'}
          iconRight={icons.ic_bell}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
        />
        <ScrollView style={[styles.eachContainer]}>
          <Text style={styles.content}>
            Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ
          </Text>
          <CustomTextTitle label={'Thông tin dịch vụ'} />

          <CustomInput
            type={'input'}
            title={'Tên tiện ích'}
            placeholder={'Nhập tên tiện ích'}
            onEndEditing={evt => setName(evt.nativeEvent.text)}
            defaultValue={name}
          />

          <Text style={[styles.label, {marginTop: 20}]}>Ghi chú</Text>
          <View style={styles.viewTextInput}>
            <TextInput
              multiline
              placeholder="Nhập ghi chú cho tiện ích"
              onEndEditing={evt => setDescription(evt.nativeEvent.text)}
              defaultValue={description}
            />
          </View>
          <View style={{marginBottom: 56}} />
        </ScrollView>

        <CustomTwoButtonBottom
          leftLabel={'Lưu'}
          rightLabel={'Thêm mới'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => createNewAmenity()}
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
export default AddUtilities;
