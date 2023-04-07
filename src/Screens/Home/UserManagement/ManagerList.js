import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import CustomSearchAppBar from '../../../Components/CommonComponent/CustomSearchAppBar';
import CustomTwoButtonBottom from '../../../Components/CommonComponent/CustomTwoButtonBottom';
import {useDispatch, useSelector} from 'react-redux';
import {managerState, updateManagers} from '../../../Store/slices/commonSlice';
import CustomPersonInfor from '../../../Components/CommonComponent/CustomPersonInfor';
import useKeyboard from '../../../Hook/useKeyboard';

const ManagerList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const ManagerSelect = useSelector(managerState);
  const keyboard = useKeyboard();
  const [textSearch, setTextSearch] = useState('');
  const [listManager, setListManager] = useState([]);

  useEffect(() => {
    setListManager(ManagerSelect);
  }, [ManagerSelect, isFocus]);

  const renderListManager = (item, index) => {
    let value = item;
    let eachIndex = index;
    const updateItem = () => {
      let newList = [...listManager];
      let itemCheck = newList[index];
      let newItem = {
        ...itemCheck,
        isCheck: itemCheck?.isCheck == false ? true : false,
      };
      newList[index] = newItem;
      setListManager(newList);
    };
    return (
      <CustomPersonInfor
        styleView={{marginTop: 10}}
        avatar={item?.avatar}
        userName={item?.fullName}
        phoneNumber={item?.phoneNumber}
        isCheck={item?.isCheck}
        onPressCheck={() => updateItem(value, eachIndex)}
      />
    );
  };

  const updateManagerList = () => {
    dispatch(updateManagers(listManager));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomSearchAppBar
        iconLeft={icons.ic_back}
        label={'Danh sách người quản lý'}
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
      </ScrollView>

      <CustomTwoButtonBottom
        leftLabel={'Lưu'}
        rightLabel={'Thêm mới'}
        onPressLeft={() => updateManagerList()}
        onPressRight={() => navigation.navigate('AddNewManager')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default ManagerList;
