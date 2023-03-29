import {useIsFocused, useNavigation} from '@react-navigation/native';
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
  Keyboard,
  Alert,
} from 'react-native';
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import {icons, colors} from '../../../Constants';
import {ScrollView} from 'react-native-virtualized-view';
import CustomSearchAppBar from '../../../Components/CommonComponent/CustomSearchAppBar';
import {useDispatch, useSelector} from 'react-redux';
import {amenityState, updateAmenity} from '../../../Store/slices/commonSlice';
import {token} from '../../../Store/slices/tokenSlice';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import RenderAmenity from '../../../Components/ComponentHome/RenderAmenity';
import {
  GetListAmenitysApi,
  DeleteAmenityApi,
} from '../../../Api/Home/AmenityApis/AmenityApis';

const UtilitiesManager = props => {
  const navigation = useNavigation();
  const isLoading = useSelector(statusState);
  const tokenStore = useSelector(token);
  const dispatch = useDispatch();
  const [keyboard, setKeyboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    getListData();
  }, [isLoading]);

  const getListData = async () => {
    await GetListAmenitysApi(tokenStore)
      .then(res => {
        if (res?.status == 200) {
          let eachData = res?.data;
          let eachArray = [];
          eachData.map((data, index) => {
            let newData = {...data, isCheck: false};
            eachArray.push(newData);
          });
          dispatch(updateAmenity(eachArray));
          setListSevice(res?.data);
          setLoading(false);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);
  const [listSevice, setListSevice] = useState([]);

  const renderListService = (item, index) => {
    return (
      <RenderAmenity
        label={item?.name}
        isDelete={true}
        onPress={() => navigation.navigate('AmenityDetail', item?.id)}
        deleteAmenity={() => {
          Alert.alert('Xóa tiện ích', 'Bạn có muốn xóa tiện ích này ?', [
            {text: 'Hủy', style: 'cancel'},
            {text: 'Xóa', onPress: () => deleteAmenity(item?.id)},
          ]);
        }}
      />
    );
  };

  const deleteAmenity = async id => {
    setLoading(true);
    await DeleteAmenityApi(tokenStore, id)
      .then(res => {
        if (res?.status == 200) {
          getListData();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <CustomLoading />}
      <CustomSearchAppBar
        iconLeft={icons.ic_back}
        label={'Quản lý tiện ích'}
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
      <View style={{flex: 1, paddingHorizontal: 10}}>
        {loading && <CustomLoading />}
        <ScrollView style={[styles.eachContainer]}>
          {listSevice.length > 0 ? (
            <FlatList
              listKey="listPaidSevice"
              style={{justifyContent: 'space-between'}}
              horizontal={false}
              scrollEnabled={false}
              numColumns={3}
              data={listSevice}
              keyExtractor={key => key.id}
              renderItem={({item, index}) => renderListService(item, index)}
            />
          ) : null}
        </ScrollView>

        <CustomButtonBottom
          label={'Thêm tiện ích mới'}
          onPress={() => {
            dispatch(updateStatus(true));
            navigation.navigate('AddUtilities');
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,

    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
  textTitle: {color: '#173b5f', fontSize: 16, fontWeight: 'bold'},
  content: {color: 'grey', fontSize: 14},
  viewButton: {alignSelf: 'center', alignItems: 'center', marginVertical: 10},
  styleButton: {
    backgroundColor: colors.mainColor,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 5,
  },
  styleButton: {
    backgroundColor: colors.mainColor,
    height: 50,
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: 'row',
  },
  styleLabel: {color: 'white', fontWeight: '500', marginLeft: 5},
});
export default UtilitiesManager;
