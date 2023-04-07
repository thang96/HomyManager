import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {colors, icons, images} from '../../../Constants';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import CustomSearchAppBar from '../../../Components/CommonComponent/CustomSearchAppBar';
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import {useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import {statusState} from '../../../Store/slices/statusSlice';
import {GetListManagersApi} from '../../../Api/Home/ManagerApis/ManagerApis';
import useKeyboard from '../../../Hook/useKeyboard';
const UserManager = () => {
  const navigation = useNavigation();
  const statusLoading = useSelector(statusState);
  const keyboard = useKeyboard();
  const [loading, setLoading] = useState(true);
  const [textSearch, setTextSearch] = useState('');
  const [listManager, setListManager] = useState([]);
  const tokenStore = useSelector(token);

  useEffect(() => {
    const getListManager = async () => {
      await GetListManagersApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            setListManager(res?.data);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListManager();
  }, [statusLoading]);

  const renderListManager = (item, index) => {
    return (
      <CustomPersonInfor
        styleView={{marginTop: 10}}
        avatar={item?.avatar}
        userName={item?.fullName}
        phoneNumber={item?.phoneNumber}
        pressAvatar={() => navigation.navigate('ManagerDetail', item?.id)}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomSearchAppBar
        iconLeft={icons.ic_back}
        label={'Người quản lý tòa nhà'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconSecondRight={icons.ic_moreOption}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
        pressIconLeft={() => navigation.goBack()}
      />
      <View style={{paddingHorizontal: 10, paddingTop: 10, flex: 1}}>
        {loading && <CustomLoading />}
        {listManager.length > 0 ? (
          <FlatList
            listKey="listManager"
            horizontal={false}
            scrollEnabled={false}
            keyExtractor={(key, index) => `${key.userName}${index}`}
            data={listManager}
            renderItem={({item, index}) => renderListManager(item, index)}
          />
        ) : null}
      </View>

      <CustomButtonBottom
        label={'Thêm mới người quản lý'}
        onPress={() => navigation.navigate('AddNewManager')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default UserManager;
