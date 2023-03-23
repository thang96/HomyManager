import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
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
  Keyboard,
} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import {ScrollView} from 'react-native-virtualized-view';
import CustomInput from '../../../Components/CommonComponent/CustomInput';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {CreateNewAmenityApi} from '../../../Api/Home/AmenityApis/AmenityApis';
import {useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';

const AddUtilities = props => {
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const [loadingAddAmenity, setLoadingAddAmenity] = useState(false);
  const [modalAddAmenity, setModalAddAmenity] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const noteRef = useRef();
  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      if (!loadingAddAmenity) {
        noteRef.current.blur();
      }
    });
  }, []);

  const createNewAmenity = async () => {
    setModalAddAmenity(true);
    let data = {name: name, description: description};
    await CreateNewAmenityApi(tokenStore, data)
      .then(res => {
        if (res?.status == 200) {
          if (res?.status == 200) {
            setModalAddAmenity(false);
            navigation.goBack();
          }
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loadingAddAmenity && <CustomLoading />}
      {modalAddAmenity && (
        <CustomModalNotify
          title={'Tạo mới tiện ích'}
          label={'Bạn có muốn thêm mới tiện ích này ?'}
          modalVisible={modalAddAmenity}
          onRequestClose={() => setModalAddAmenity(false)}
          pressConfirm={() => createNewAmenity()}
        />
      )}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Thêm tiện ích'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={[styles.eachContainer]}>
        <Text style={styles.content}>
          Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ
        </Text>
        <CustomTextTitle label={'Thông tin tiện ích'} />

        <CustomInput
          important={true}
          type={'input'}
          title={'Tên tiện ích'}
          placeholder={'Nhập tên tiện ích'}
          onEndEditing={evt => setName(evt.nativeEvent.text)}
          defaultValue={name}
        />

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Text style={[styles.label]}>Ghi chú</Text>
          <Text style={{color: 'red', fontSize: 14}}> *</Text>
        </View>
        <View style={styles.viewTextInput}>
          <TextInput
            ref={noteRef}
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
        onPressRight={() => setModalAddAmenity(true)}
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
