import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Keyboard,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {colors, icons, images, svgs} from '../../Constants';
import {useNavigation} from '@react-navigation/native';
import CustomSearchAppBar from '../../Components/CommonComponent/CustomSearchAppBar';
import {ScrollView} from 'react-native-virtualized-view';

const MessageScreen = () => {
  const navigation = useNavigation();
  const [keyboard, setKeyboard] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [data, setData] = useState(FAKE_DATA);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatScreen', item)}
        style={[styles.viewShadow, styles.buttonMessage]}>
        <Image
          // source={{uri: item?.url}}
          style={{width: 50, height: 50, borderRadius: 50, marginRight: 10}}
        />
        <View style={{flex: 1}}>
          <View style={styles.viewRowBetween}>
            <Text style={styles.name}>{item?.name}</Text>
            <Text style={styles.message}>{item?.time}</Text>
          </View>
          <View style={styles.viewRowBetween}>
            <Text style={[{maxWidth: '85%'}, styles.message]} numberOfLines={1}>
              {item?.message}
            </Text>
            {item?.numberOfUnreadMessages > 0 && (
              <View style={styles.viewUnRead}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 9,
                  }}>{`${item?.numberOfUnreadMessages}`}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomSearchAppBar
        svgLeft={svgs.LogoApp}
        label={'Tin nhắn'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        pressSeccodIconRight={() => navigation.navigate('StackAccountPage')}
        iconSecondRight={icons.ic_user}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
      />
      <ScrollView style={{paddingHorizontal: 10, paddingTop: 20}}>
        <FlatList
          data={data}
          keyExtractor={key => key?.id}
          renderItem={({item, index}) => renderItem(item, index)}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {backgroundColor: colors.backgroundGrey, flex: 1},
  viewShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 0.5,
    elevation: 5,
  },
  buttonMessage: {
    backgroundColor: 'white',
    height: 60,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  viewRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewUnRead: {
    backgroundColor: colors.mainColor,
    width: 22,
    height: 22,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {color: '#374047', fontWeight: '600', fontSize: 15},
  message: {color: '#5F6E78', fontWeight: '400', fontSize: 13},
});
export default MessageScreen;
const FAKE_DATA = [
  {
    url: icons.ic_user,
    name: 'Bùi Đức Thắng',
    time: '9h30',
    message: 'Có nghe ko thế,đi đâu rồi?',
    numberOfUnreadMessages: 2,
    status: true,
    id: 1,
  },
  {
    url: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg',
    name: 'Kiều Anh',
    time: '9h30',
    message: 'Alo đang trốn đâu đấy',
    numberOfUnreadMessages: 1,
    status: true,
    id: 2,
  },
  {
    url: 'https://vnwriter.net/wp-content/uploads/2018/05/phim-hay-ve-mafia.jpg',
    name: 'Bố',
    time: '9h30',
    message: 'Mày về nhà xem,tao cho mày no đòn con ạ',
    numberOfUnreadMessages: 1,
    status: false,
    id: 3,
  },
  {
    url: 'https://t3.ftcdn.net/jpg/02/89/72/92/360_F_289729214_0qIRu5M7POyhPbPQycBst7ojydpLhFbX.jpg',
    name: 'Mẹ',
    time: '9h30',
    message: 'Không cần về nữa đâu',
    numberOfUnreadMessages: 0,
    status: false,
    id: 4,
  },
];
