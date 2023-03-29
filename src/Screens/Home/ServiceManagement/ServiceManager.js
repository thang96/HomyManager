import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  Alert,
} from 'react-native';

import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import {icons, colors} from '../../../Constants';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {ScrollView} from 'react-native-virtualized-view';
import CustomSearchAppBar from '../../../Components/CommonComponent/CustomSearchAppBar';
import {useDispatch, useSelector} from 'react-redux';
import {token} from '../../../Store/slices/tokenSlice';
import RenderService from '../../../Components/ComponentHome/RenderService';
import {
  DeleteServiceApi,
  GetListServicesApi,
} from '../../../Api/Home/ServiceApis/ServiceApis';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';

const ServiceManager = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [keyboard, setKeyboard] = useState(false);
  const isLoading = useSelector(statusState);
  const [textSearch, setTextSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const tokenStore = useSelector(token);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

  useEffect(() => {
    getListService();
  }, [isLoading]);

  const getListService = async () => {
    await GetListServicesApi(tokenStore)
      .then(res => {
        if (res?.status == 200) {
          setListSevice(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  const [listSevice, setListSevice] = useState([]);

  const renderListService = (item, index) => {
    return (
      <RenderService
        isDelete={true}
        icon={`${item?.icon}`}
        name={`${item?.name}`}
        calculateUnit={`${item?.calculateUnit}`}
        fee={`${item?.fee?.toLocaleString()}`}
        onPress={() => navigation.navigate('ServiceDetail', item?.id)}
        deleteService={() => {
          Alert.alert('Xóa dịch vụ', 'Bạn có muốn xóa dịch vụ này ?', [
            {text: 'Hủy', style: 'cancel'},
            {text: 'Xóa', onPress: () => deleteService(item?.id)},
          ]);
        }}
      />
    );
  };
  const deleteService = async id => {
    setLoading(true);
    await DeleteServiceApi(tokenStore, id)
      .then(res => {
        if (res?.status == 200) {
          getListService();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <CustomLoading />}
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomSearchAppBar
          iconLeft={icons.ic_back}
          label={'Quản lý dịch vụ'}
          iconRight={icons.ic_bell}
          pressIconRight={() => navigation.navigate('NotificationScreen')}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
          keyboard={keyboard}
          textSearch={textSearch}
          value={textSearch}
          onChangeText={text => setTextSearch(text)}
          placeholder={'Tìm kiếm...'}
        />

        <View
          style={{
            flex: 1,
          }}>
          <ScrollView style={[styles.eachContainer]}>
            {listSevice.length > 0 ? (
              <FlatList
                listKey="listPaidSevice"
                style={{justifyContent: 'space-between'}}
                horizontal={false}
                scrollEnabled={false}
                numColumns={2}
                data={listSevice}
                keyExtractor={key => key.id}
                renderItem={({item, index}) => renderListService(item, index)}
              />
            ) : null}
          </ScrollView>

          <CustomButtonBottom
            label={'Thêm dịch vụ mới'}
            onPress={() => {
              dispatch(updateStatus(true));
              navigation.navigate('AddService');
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
    paddingHorizontal: 10,
  },
  textTitle: {color: '#173b5f', fontSize: 16, fontWeight: 'bold'},
  content: {color: 'grey', fontSize: 14, fontWeight: '500'},
  viewButton: {alignSelf: 'center', alignItems: 'center', marginVertical: 10},
  styleButton: {
    backgroundColor: colors.mainColor,
    height: 50,
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: 'row',
  },
  styleLabel: {color: 'white', fontWeight: '500', marginLeft: 5},
});
export default ServiceManager;
