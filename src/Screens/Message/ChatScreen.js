import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Keyboard, ScrollView} from 'react-native';
import ComponentChatBarBottom from '../../Components/ComponentChatBarBottom';
import CustomAppBarChatScreen from '../../Components/CustomAppBarChatScreen';
import {colors, icons} from '../../Constants';
const avatar =
  'https://i.natgeofe.com/k/63b1a8a7-0081-493e-8b53-81d01261ab5d/red-panda-full-body_4x3.jpg';

const ChatScreen = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const [keyboard, setKeyboard] = useState(false);
  const [data, setData] = useState(FAKE_DATA);
  const scrollViewRef = useRef();
  const [message, setMessage] = useState('');
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);
  const myId = 1;

  const renderItem = (item, index) => {
    return (
      <View
        key={`${item?.id}${index}`}
        style={{
          minHeight: 50,
          marginTop: 10,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            alignItems: item?.id == myId ? 'flex-end' : 'flex-start',
          }}>
          <View
            style={[
              {backgroundColor: item?.id == myId ? colors.mainColor : 'white'},
              styles.shadowView,
            ]}>
            <Text
              style={{
                maxWidth: 300,
                margin: 5,
                color: item?.id == myId ? 'white' : 'black',
              }}>
              {item?.message}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (data != []) {
      renderItem();
    }
  }, [data]);

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({animated: true});
  }, [data, keyboard]);

  const sendMessage = () => {
    let eachMS = [...data];
    if (message != '') {
      eachMS.push({id: 1, message: message});
      setData(eachMS);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <CustomAppBarChatScreen
        iconLeft={icons.ic_back}
        pressIconLeft={() => navigation.goBack()}
        avatar={route?.params?.url}
        iconRight={icons.ic_phone}
        iconSecondRight={icons.ic_moreOption}
        status={route?.params?.status}
      />
      <ScrollView ref={scrollViewRef} style={{flex: 1}}>
        {data.map((item, index) => renderItem(item, index))}
      </ScrollView>
      <ComponentChatBarBottom
        value={message}
        placeholder={'Nhập tin nhắn'}
        onChangeText={text => setMessage(text)}
        pressSendMessage={() => sendMessage()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
  shadowView: {
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 1,
    elevation: 5,
  },
});
export default ChatScreen;

const FAKE_DATA = [
  {
    message: 'Mày mới làm gì thế?',
    id: 2,
  },
  {
    message: 'Bố m cứ alo cho tao',
    id: 2,
  },
  {
    message: 'Báo nhà 500 củ',
    id: 1,
  },
  {
    message: 'Mới tạch trận MU',
    id: 1,
  },
  {
    message: 'ĐKM',
    id: 2,
  },
  {
    message: 'Báo v k l',
    id: 2,
  },
  {
    message: 'Bố mẹ mày đang truy lùng mày kìa',
    id: 2,
  },
  {
    message: 'Mới qua nhà tao xong',
    id: 2,
  },
  {
    message: 'Nhẩy cầu đi em',
    id: 2,
  },
  {
    message: 'Sống làm gì nữa',
    id: 2,
  },
  {
    message: 'Chết cho lành em ạ',
    id: 2,
  },
];
