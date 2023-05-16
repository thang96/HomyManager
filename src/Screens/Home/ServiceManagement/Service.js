import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import CustomAppBar from '../../../Components/CommonComponent/CustomAppBar';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import CustomChecker from '../../../Components/ComponentHome/CustomChecker';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {useDispatch, useSelector} from 'react-redux';
import {updateServices} from '../../../Store/slices/commonSlice';
import {token} from '../../../Store/slices/tokenSlice';
import {GetListServicesApi} from '../../../Api/Home/ServiceApis/ServiceApis';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import {uuid} from '../../../utils/uuid';
import CustomSuggest from '../../../Components/CommonComponent/CustomSuggest';

const Service = props => {
  const loadingState = useSelector(statusState);
  const tokenStore = useSelector(token);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [listSevice, setListSevice] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const getListService = async () => {
      await GetListServicesApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let eachData = res?.data;
            let eachService = [];
            eachData.map((data, index) => {
              let newData = {...data, isCheck: false};
              eachService.push(newData);
            });
            setListSevice(eachService);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListService();
  }, [loadingState]);

  const renderListService = (item, index) => {
    const updateItem = () => {
      let newList = [...listSevice];
      let itemCheck = newList[index];
      let newItem = {
        ...itemCheck,
        isCheck: itemCheck?.isCheck == false ? true : false,
      };
      newList[index] = newItem;
      setListSevice(newList);
    };
    return (
      <CustomChecker
        label={`${item?.name}`}
        value={`${item?.fee}`}
        isCheck={item?.isCheck}
        onPress={() => updateItem()}
      />
    );
  };

  const updateservices = () => {
    let services = [];
    for (let index = 0; index < listSevice.length; index++) {
      const element = listSevice[index];
      if (element?.isCheck == true) {
        services.push(element);
      }
    }
    dispatch(updateServices(services));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading && <CustomLoading />}
      <CustomAppBar
        iconLeft={icons.ic_back}
        label={'Dịch vụ'}
        // iconRight={icons.ic_bell}
        // pressIconRight={() => navigation.navigate('NotificationScreen')}
        // iconSecondRight={icons.ic_moreOption}
        pressIconLeft={() => navigation.goBack()}
      />
      <View style={[styles.eachContainer]}>
        <CustomSuggest
          label={'Chọn dịch vụ tính phí đã có hoặc thêm mới dịch vụ'}
        />

        <CustomTextTitle label={'Dịch vụ đã thêm'} />

        {listSevice.length > 0 ? (
          <FlatList
            listKey="listPaidSevice"
            numColumns={2}
            data={listSevice}
            keyExtractor={uuid}
            renderItem={({item, index}) => renderListService(item, index)}
          />
        ) : null}
      </View>
      <CustomTwoButtonBottom
        leftLabel={'Lưu'}
        rightLabel={'Thêm mới'}
        onPressLeft={() => updateservices()}
        onPressRight={() => {
          dispatch(updateStatus(true));
          navigation.navigate('AddService');
        }}
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
});
export default Service;
