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
  Keyboard,
} from 'react-native';

import CustomButtonBottom from '../../../Components/CustomButtonBottom';
import {icons, colors} from '../../../Constants';
import CustomChecker from '../../../Components/CustomChecker';
import {ScrollView} from 'react-native-virtualized-view';
import CustomSearchAppBar from '../../../Components/CustomSearchAppBar';
import CustomRenderItem from '../../../Components/CustomRenderItem';

const ServiceManager = props => {
  const navigation = useNavigation();
  const [keyboard, setKeyboard] = useState(false);
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

  const [listSevice, setListSevice] = useState([
    {label: 'Điện', value: '4000/KWH', icon: icons.ic_electricity},
    {label: 'Nước', value: '5000/M³', icon: icons.ic_waterDrop},
    {label: 'Wifi', value: '50000/T', icon: icons.ic_wifi},
    {label: 'Ga', value: '200000/T', icon: icons.ic_flame},
    {label: 'Rác', value: '30000/T', icon: icons.ic_trash},
    {label: 'Ga2', value: '200000/T', icon: icons.ic_electricity},
    {label: 'Ga3', value: '200000/T', icon: icons.ic_electricity},
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
      <CustomRenderItem
        icon={item?.icon}
        label={item?.label}
        value={item?.value}
        onPress={() => updateItem()}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomSearchAppBar
          iconLeft={icons.ic_back}
          label={'Quản lý dịch vụ'}
          iconRight={icons.ic_bell}
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
                keyExtractor={key => key.label}
                renderItem={({item, index}) => renderListService(item, index)}
              />
            ) : null}
          </ScrollView>

          <CustomButtonBottom
            label={'Thêm dịch vụ mới'}
            onPress={() => navigation.navigate('Service')}
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
