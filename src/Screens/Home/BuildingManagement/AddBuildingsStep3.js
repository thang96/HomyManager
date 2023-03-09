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
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomSuggest from '../../../Components/CustomSuggest';
import CustomTwoButtonBottom from '../../../Components/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import CustomPaidService from '../../../Components/CustomPaidService';
import CustomFreeService from '../../../Components/CustomFreeService';
import CustomAppBarStep from '../../../Components/CustomAppBarStep';
import CustomTextTitle from '../../../Components/CustomTextTitle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetAmenityApi, GetServiceApi} from '../../../Api/Home/HomeApis';

const AddBuildingsStep3 = props => {
  const navigation = useNavigation();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  const [noteForTenant, setNoteForTenant] = useState('');
  const [noteForInvoice, setNoteForInvoice] = useState('');
  const [serviceIds, setServiceIds] = useState([]);
  const [amenityIds, setAmenityIds] = useState([]);
  console.log(amenityIds);

  const [listService, setListService] = useState([]);
  const [listAmenity, setListAmenity] = useState([]);

  useEffect(() => {
    setListData();
  }, [listService, listAmenity]);
  const setListData = () => {
    let eachServiceIds = [];
    let eachAmenityIds = [];
    for (let index = 0; index < listService.length; index++) {
      const element = listService[index];
      eachServiceIds.push(element?.id);
    }
    for (let index = 0; index < listAmenity.length; index++) {
      const element = listAmenity[index];
      eachAmenityIds.push(element?.id);
    }
    setServiceIds(eachServiceIds);
    setAmenityIds(eachAmenityIds);
  };

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    await AsyncStorage.getItem('token')
      .then(async tokenStore => {
        if (tokenStore != null && tokenStore != undefined && tokenStore != '') {
          await GetServiceApi(tokenStore)
            .then(res => {
              if (res?.status == 200) {
                setListService(res?.data);
                setLoading(false);
              }
            })
            .catch(error => console.log(error));
          await GetAmenityApi(tokenStore)
            .then(res => {
              if (res?.status == 200) {
                setListAmenity(res?.data);
                setLoading(false);
              }
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  };

  const renderPaidSevice = (item, index) => {
    let value = item;
    return (
      <CustomPaidService
        label={item?.name}
        value={item?.price}
        icon={item?.icon}
      />
    );
  };

  const renderFreeSevice = (item, index) => {
    return <CustomFreeService label={item?.name} />;
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomAppBarStep
          iconLeft={icons.ic_back}
          label={'Thiết lập dịch vụ'}
          iconRight={icons.ic_bell}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
          step={3}
        />

        <ScrollView style={[styles.eachContainer]}>
          <CustomSuggest
            label={'Vui lòng điền đầy đủ thông tin! Mục có dấu * là bắt buộc'}
          />

          <CustomTextTitle
            label={'Dịch vụ có phí'}
            labelButton={'Thêm'}
            icon={icons.ic_plus}
            onPress={() => navigation.navigate('Service')}
          />

          {listService.length > 0 ? (
            <FlatList
              listKey="listService"
              horizontal={false}
              scrollEnabled={false}
              numColumns={2}
              keyExtractor={item => `${item?.id}`}
              data={listService}
              renderItem={({item, index}) => renderPaidSevice(item, index)}
            />
          ) : null}

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.textPicker}>Đã chọn </Text>
            <Text style={styles.pickerTotal}>{`${listService.length}`}</Text>
          </View>

          <View style={styles.line} />

          <CustomTextTitle
            label={'Tiện ích miễn phí'}
            labelButton={'Thêm'}
            icon={icons.ic_plus}
            onPress={() => navigation.navigate('Utilities')}
          />

          {listAmenity.length > 0 ? (
            <FlatList
              listKey="listAmenity"
              style={{justifyContent: 'space-between'}}
              horizontal={false}
              scrollEnabled={false}
              numColumns={3}
              keyExtractor={key => key.value}
              data={listAmenity}
              renderItem={({item, index}) => renderFreeSevice(item, index)}
            />
          ) : null}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.textPicker}>Đã chọn </Text>
            <Text style={styles.pickerTotal}>{`${listAmenity.length}`}</Text>
          </View>

          <View style={styles.line} />

          <CustomTextTitle label={'Lưu ý'} />

          <Text style={[styles.label]}>Lưu ý của tòa nhà</Text>
          <View style={styles.viewTextInput}>
            <TextInput
              style={{color: 'black'}}
              multiline
              placeholder="Nhập lưu ý của tòa nhà cho người thuê phòng"
              defaultValue={noteForTenant}
              onEndEditing={nativeEvent => {
                console.log(nativeEvent);
              }}
            />
          </View>

          <Text style={[styles.label, {marginTop: 20}]}>Ghi chú hóa đơn</Text>
          <View style={styles.viewTextInput}>
            <TextInput
              style={{color: 'black'}}
              multiline
              placeholder="Nhập ghi chú hóa đơn"
              value={noteForInvoice}
              onChangeText={text => {
                setNoteForInvoice(text);
              }}
            />
          </View>

          <View style={{marginBottom: 56}} />
        </ScrollView>

        <CustomTwoButtonBottom
          leftLabel={'Trở lại'}
          rightLabel={'Hoàn tất'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => {
            console.log('Ok');
          }}
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
  content: {color: 'rgba(127, 138, 147, 1)', fontSize: 13},
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    marginVertical: 20,
    alignSelf: 'center',
  },
  textPicker: {fontSize: 15, fontWeight: '400', color: 'rgba(254, 122, 55, 1)'},
  pickerTotal: {
    fontSize: 15,
    color: 'rgba(254, 122, 55, 1)',
    fontWeight: '600',
  },
  viewTextInput: {
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 5,
    borderColor: colors.borderInput,
    height: 120,
  },
  label: {fontSize: 15, color: 'rgba(55, 64, 71, 1)', fontWeight: '400'},
});
export default AddBuildingsStep3;
