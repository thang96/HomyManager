import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
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
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import CustomSearchAppBar from '../../../Components/CommonComponent/CustomSearchAppBar';
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import {useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {GetListTenantsApi} from '../../../Api/Home/TenantApis/TenantApis';
const TenantManager = () => {
  const navigation = useNavigation();
  const [keyboard, setKeyboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [textSearch, setTextSearch] = useState('');
  const [listTenants, setListTenants] = useState([]);
  const tokenStore = useSelector(token);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getListTenants = async () => {
      await GetListTenantsApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            setListTenants(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListTenants();
  }, [isFocused]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

  const renderListTenants = (item, index) => {
    let value = item;
    return (
      <CustomPersonInfor
        styleView={{marginTop: 10}}
        avatar={item?.avatar}
        userName={item?.userName}
        phoneNumber={item?.phoneNumber}
        pressAvatar={() => navigation.navigate('TenantList', item?.id)}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomSearchAppBar
        iconLeft={icons.ic_back}
        label={'Quản lý người thuê'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
        pressIconLeft={() => navigation.goBack()}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
        {loading && <CustomLoading />}
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
      </ScrollView>

      <CustomButtonBottom
        label={'Thêm mới người thuê'}
        onPress={() => navigation.navigate('AddNewTenant')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default TenantManager;
