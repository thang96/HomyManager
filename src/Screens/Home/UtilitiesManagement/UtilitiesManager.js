import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Alert} from 'react-native';
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import {icons, colors} from '../../../Constants';
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
import useKeyboard from '../../../Hook/useKeyboard';

const UtilitiesManager = props => {
  const navigation = useNavigation();
  const isLoading = useSelector(statusState);
  const tokenStore = useSelector(token);
  const dispatch = useDispatch();
  const keyboard = useKeyboard();
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
      {loading && <CustomLoading />}
      <View style={[styles.eachContainer]}>
        {listSevice.length > 0 ? (
          <FlatList
            listKey="listPaidSevice"
            numColumns={2}
            data={listSevice}
            keyExtractor={key => key.id}
            renderItem={({item, index}) => renderListService(item, index)}
          />
        ) : null}
      </View>

      <CustomButtonBottom
        label={'Thêm tiện ích mới'}
        onPress={() => {
          dispatch(updateStatus(true));
          navigation.navigate('AddUtilities');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    marginTop: 10,
    backgroundColor: colors.backgroundGrey,
    paddingHorizontal: 10,
  },
});
export default UtilitiesManager;
