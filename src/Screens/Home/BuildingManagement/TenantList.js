import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  Image,
  TouchableOpacity,
  Dimensions,
  SectionList,
} from 'react-native';
import CustomButton from '../../../Components/CustomButton';
import {ScrollView} from 'react-native-virtualized-view';
import {colors, icons, images} from '../../../Constants';
import CustomManagerInfor from '../../../Components/CustomManagerInfor';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import CustomSearchAppBar from '../../../Components/CustomSearchAppBar';
import CustomButtonBottom from '../../../Components/CustomButtonBottom';

const TenantList = () => {
  const navigation = useNavigation();
  const avatar =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ragdoll_Kater%2C_drei_Jahre_alt%2C_RAG_n_21_seal-tabby-colourpoint%2C_Januar_2015.JPG/330px-Ragdoll_Kater%2C_drei_Jahre_alt%2C_RAG_n_21_seal-tabby-colourpoint%2C_Januar_2015.JPG';
  const [keyboard, setKeyboard] = useState(null);
  const [textSearch, setTextSearch] = useState('');
  const [listTenants, setListTenants] = useState([
    {userName: 'Tường Vân', phoneNumber: '123321123', avatar: avatar},
    {userName: 'Hoàng Khánh', phoneNumber: '025874136', avatar: avatar},
    {userName: 'Gia Bảo', phoneNumber: '058963145', avatar: avatar},
  ]);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

  const renderListTenants = (item, index) => {
    let value = item;
    return (
      <CustomManagerInfor
        styleView={{marginTop: 10}}
        avatar={item?.avatar}
        userName={item?.userName}
        phoneNumber={item?.phoneNumber}
        onPress={() => {}}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <CustomSearchAppBar
        iconLeft={icons.ic_back}
        label={'Danh sách người thuê'}
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
        {listTenants.length > 0 ? (
          <FlatList
            listKey="listTenants"
            horizontal={false}
            scrollEnabled={false}
            keyExtractor={(key, index) => `${key.userName}${index}`}
            data={listTenants}
            renderItem={({item, index}) => renderListTenants(item, index)}
          />
        ) : null}
      </ScrollView>

      <CustomButtonBottom
        label={'Thêm mới người thuê'}
        onPress={() => navigation.navigate('AddNewTenant')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default TenantList;
