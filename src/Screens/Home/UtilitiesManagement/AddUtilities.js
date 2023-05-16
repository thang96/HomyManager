import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {CreateNewAmenityApi} from '../../../Api/Home/AmenityApis/AmenityApis';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import ComponentInput from '../../../Components/CommonComponent/ComponentInput';
import {updateStatus} from '../../../Store/slices/statusSlice';

const AddUtilities = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const tokenStore = useSelector(token);
  const [loadingAddAmenity, setLoadingAddAmenity] = useState(false);
  const [modalAddAmenity, setModalAddAmenity] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const createNewAmenity = async () => {
    setModalAddAmenity(false);
    setLoadingAddAmenity(true);
    let data = {name: name, description: description};
    await CreateNewAmenityApi(tokenStore, data)
      .then(res => {
        if (res?.status == 200) {
          if (res?.status == 200) {
            setLoadingAddAmenity(false);
            dispatch(updateStatus(false));
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
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        keyboardDismissMode="none"
        style={[styles.eachContainer]}>
        <CustomSuggest
          label={'Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ'}
        />

        <CustomTextTitle label={'Thông tin tiện ích'} />

        <ComponentInput
          important={true}
          type={'input'}
          title={'Tên tiện ích'}
          placeholder={'Nhập tên tiện ích'}
          value={name}
          onChangeText={text => setName(text)}
        />
        <ComponentInput
          important={true}
          viewComponent={{marginTop: 10}}
          type={'inputNote'}
          title={'Mô tả tiện ích'}
          placeholder={'Nhập mô tả tiện ích'}
          value={description}
          onChangeText={text => setDescription(text)}
        />

        <View style={{marginBottom: 56}} />
      </ScrollView>

      <CustomTwoButtonBottom
        styleButtonLeft={styles.styleButtonLeft}
        styleLabelLeft={styles.styleLabelLeft}
        leftLabel={'Hủy'}
        rightLabel={'Thêm mới'}
        onPressLeft={() => {
          dispatch(updateStatus(false));
          navigation.goBack();
        }}
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
  styleButtonLeft: {
    borderColor: '#FE7A37',
    backgroundColor: 'white',
    marginRight: 5,
  },
  styleLabelLeft: {color: '#FE7A37', fontSize: 15, fontWeight: '600'},
});
export default AddUtilities;
