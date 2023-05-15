import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  Image,
  TouchableOpacity,
  Dimensions,
  SectionList,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import CustomSearchAppBar from '../../../Components/CommonComponent/CustomSearchAppBar';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {useDispatch, useSelector} from 'react-redux';
import {tenantState, updateTenants} from '../../../Store/slices/commonSlice';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {GetListTenantsApi} from '../../../Api/Home/TenantApis/TenantApis';
import {token} from '../../../Store/slices/tokenSlice';
import useKeyboard from '../../../Hook/useKeyboard';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';

const TenantList = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const loadingState = useSelector(statusState);
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const tenantsSelect = useSelector(tenantState);
  const keyboard = useKeyboard();
  const [textSearch, setTextSearch] = useState('');
  const [listTenants, setListTenants] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await GetListTenantsApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let eachData = res?.data;
            let eachArray = [];
            eachData.map((data, index) => {
              let newData = {...data, isCheck: false};
              eachArray.push(newData);
            });
            setListTenants(eachArray);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getData();
  }, [loadingState]);

  const renderListTenants = (item, index) => {
    let value = item;
    let eachIndex = index;
    const updateItem = () => {
      let newList = [...listTenants];
      let itemCheck = newList[index];
      let newItem = {
        ...itemCheck,
        isCheck: itemCheck?.isCheck == false ? true : false,
      };
      newList[index] = newItem;
      setListTenants(newList);
    };
    return (
      <CustomPersonInfor
        styleView={{marginTop: 10}}
        avatar={item?.avatarImage?.fileUrl}
        userName={item?.fullName}
        phoneNumber={item?.phoneNumber}
        isCheck={item?.isCheck}
        onPressCheck={() => updateItem(value, eachIndex)}
      />
    );
  };

  const updateTenantList = () => {
    let tenants = [];
    for (let index = 0; index < listTenants.length; index++) {
      const element = listTenants[index];
      if (element?.isCheck == true) {
        tenants.push(element);
      }
    }
    dispatch(updateTenants(tenants));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <CustomLoading />}
      <CustomSearchAppBar
        iconLeft={icons.ic_back}
        label={'Danh sách người thuê'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
        pressIconLeft={() => navigation.goBack()}
      />
      <View style={{paddingHorizontal: 10, paddingTop: 10, flex: 1}}>
        {listTenants.length > 0 ? (
          <FlatList
            listKey="listTenants"
            horizontal={false}
            scrollEnabled={false}
            keyExtractor={(key, index) => `${key.userName}${index}`}
            data={listTenants}
            renderItem={({item, index}) => renderListTenants(item, index)}
          />
        ) : null}
      </View>

      <CustomTwoButtonBottom
        leftLabel={'Lưu'}
        rightLabel={'Thêm mới'}
        onPressLeft={() => updateTenantList()}
        onPressRight={() => {
          dispatch(updateStatus('addTenantSuccess'));
          navigation.navigate('AddNewTenant');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default TenantList;
