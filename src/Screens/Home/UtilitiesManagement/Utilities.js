import {useNavigation} from '@react-navigation/native';
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
} from 'react-native';
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomTwoButtonBottom from '../../../Components/CustomTwoButtonBottom';
import {icons, colors} from '../../../Constants';
import {ScrollView} from 'react-native-virtualized-view';
import CustomSuggest from '../../../Components/CustomSuggest';
import CustomChecker from '../../../Components/CustomChecker';
import CustomTextTitle from '../../../Components/CustomTextTitle';

const Utilities = props => {
  const navigation = useNavigation();

  const [listSevice, setListSevice] = useState([
    {label: 'Điện', value: '4000/KWH', isCheck: true},
    {label: 'Nước', value: '5000/M³', isCheck: false},
    {label: 'Wifi', value: '50000/T', isCheck: false},
    {label: 'Ga', value: '200000/T', isCheck: true},
    {label: 'Ga1', value: '200000/T', isCheck: false},
    {label: 'Ga2', value: '200000/T', isCheck: false},
    {label: 'Ga3', value: '200000/T', isCheck: true},
  ]);

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
        icon={icons.ic_utilities}
        label={item?.label}
        value={item?.value}
        isCheck={item?.isCheck}
        onPress={() => updateItem()}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomAppBar
          iconLeft={icons.ic_back}
          label={'Tiện ích'}
          iconRight={icons.ic_bell}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
        />
        <ScrollView style={[styles.eachContainer]}>
          <CustomSuggest
            label={'Chọn tiện ích miễn phí đã có hoặc thêm mới tiện ích'}
          />
          <CustomTextTitle label={'Tiện ích hiện có'} />

          {listSevice.length > 0 ? (
            <FlatList
              listKey="listPaidSevice"
              style={{justifyContent: 'space-between'}}
              horizontal={false}
              scrollEnabled={false}
              numColumns={2}
              data={listSevice}
              keyExtractor={key => key.label}
              renderItem={({item, index}) => renderListService(item, index)}
            />
          ) : null}
        </ScrollView>
        <CustomTwoButtonBottom
          leftLabel={'Lưu'}
          rightLabel={'Thêm mới'}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => navigation.navigate('AddUtilities')}
        />
      </KeyboardAvoidingView>
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
