import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, ScrollView} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';
import CustomChecker from '../../../Components/ComponentHome/CustomChecker';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {useDispatch, useSelector} from 'react-redux';
import {amenityState, updateAmenity} from '../../../Store/slices/commonSlice';
import {GetListAmenitysApi} from '../../../Api/Home/AmenityApis/AmenityApis';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import {token} from '../../../Store/slices/tokenSlice';

const Utilities = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tokenStore = useSelector(token);
  const loadingState = useSelector(statusState);
  const [listAmenitys, setListAmenitys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getListAmenity = async () => {
      await GetListAmenitysApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let eachData = res?.data;
            let eachArray = [];
            eachData.map((data, index) => {
              let newData = {...data, isCheck: false};
              eachArray.push(newData);
            });
            setListAmenitys(eachArray);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListAmenity();
  }, [loadingState]);

  const renderListService = (item, index) => {
    const updateItem = () => {
      let newList = [...listAmenitys];
      let itemCheck = newList[index];
      let newItem = {
        ...itemCheck,
        isCheck: itemCheck?.isCheck == false ? true : false,
      };
      newList[index] = newItem;
      setListAmenitys(newList);
    };
    return (
      <CustomChecker
        label={`${item?.name}`}
        isCheck={item?.isCheck}
        onPress={() => updateItem()}
      />
    );
  };

  const updateAmenitys = () => {
    let amenitys = [];
    for (let index = 0; index < listAmenitys.length; index++) {
      const element = listAmenitys[index];
      if (element?.isCheck == true) {
        amenitys.push(element);
      }
    }
    dispatch(updateAmenity(amenitys));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {loading && <CustomLoading />}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Tiện ích'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <View style={[styles.eachContainer]}>
        <CustomSuggest
          label={'Chọn tiện ích miễn phí đã có hoặc thêm mới tiện ích'}
        />
        <CustomTextTitle label={'Tiện ích hiện có'} />

        {listAmenitys.length > 0 ? (
          <FlatList
            listKey="listPaidSevice"
            numColumns={2}
            data={listAmenitys}
            keyExtractor={key => `${key.id}`}
            renderItem={({item, index}) => renderListService(item, index)}
          />
        ) : null}
      </View>
      <CustomTwoButtonBottom
        leftLabel={'Lưu'}
        rightLabel={'Thêm mới'}
        onPressLeft={() => updateAmenitys()}
        onPressRight={() => {
          dispatch(updateStatus('goToUpdateUtilities'));
          navigation.navigate('AddUtilities');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.backgroundGrey,
  },
  textTitle: {color: '#173b5f', fontSize: 16, fontWeight: 'bold'},
  content: {color: 'rgba(127, 138, 147, 1)', fontSize: 13, fontWeight: '400'},
  viewButton: {alignSelf: 'center', alignItems: 'center', marginVertical: 50},
});
export default Utilities;
