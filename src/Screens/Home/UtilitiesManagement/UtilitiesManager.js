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
import {ScrollView} from 'react-native-virtualized-view';
import CustomChecker from '../../../Components/CustomChecker';
import CustomSearchAppBar from '../../../Components/CustomSearchAppBar';
import CustomRenderItem from '../../../Components/CustomRenderItem';

const UtilitiesManager = props => {
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
    return <CustomRenderItem label={item?.label} />;
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomSearchAppBar
          iconLeft={icons.ic_back}
          label={'Quản lý tiện ích'}
          iconRight={icons.ic_bell}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
          keyboard={keyboard}
          textSearch={textSearch}
          value={textSearch}
          onChangeText={text => setTextSearch(text)}
          placeholder={'Tìm kiếm...'}
        />
        <View style={{flex: 1, paddingHorizontal: 10}}>
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
            label={'Thêm tiện ích mới'}
            onPress={() => navigation.navigate('AddUtilities')}
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
