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
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {GetListTenantsApi} from '../../../Api/Home/TenantApis/TenantApis';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import useKeyboard from '../../../Hook/useKeyboard';

const TenantManager = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const keyboard = useKeyboard();
  const [loading, setLoading] = useState(true);
  const [textSearch, setTextSearch] = useState('');
  const [listTenants, setListTenants] = useState([]);
  const tokenStore = useSelector(token);
  const statusLoading = useSelector(statusState);

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
  }, [statusLoading]);

  const renderListTenants = (item, index) => {
    return (
      <CustomPersonInfor
        styleView={{marginTop: 10}}
        avatar={item?.avatarImage?.fileUrl}
        userName={item?.fullName}
        phoneNumber={item?.phoneNumber}
        pressAvatar={() => navigation.navigate('TenantDetail', item?.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomSearchAppBar
        iconLeft={icons.ic_back}
        label={'Quản lý người thuê'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
        pressIconLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
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
      </View>

      <CustomButtonBottom
        label={'Thêm mới người thuê'}
        onPress={() => {
          dispatch(updateStatus(true));
          navigation.navigate('AddNewTenant');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  eachContainer: {paddingHorizontal: 10, paddingTop: 10, flex: 1},
});
export default TenantManager;
