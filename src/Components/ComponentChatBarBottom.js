import {useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, Image, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors, icons} from '../Constants';
import CustomButton from './CustomButton';

const ComponentChatBarBottom = props => {
  const {placeholder, onChangeText, pressSendMessage, value} = props;
  return (
    <View style={styles.styleChatBar}>
      <CustomButton
        styleButton={{width: 50, height: 50}}
        icon={icons.ic_mic}
        styleIcon={{width: 30, height: 30}}
      />
      <TextInput
        style={{flex: 1}}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
      <CustomButton
        styleButton={{width: 40, height: 50}}
        icon={icons.ic_emoji}
        styleIcon={{width: 30, height: 30}}
      />
      <CustomButton
        styleButton={{width: 50, height: 50}}
        icon={icons.ic_addCircle}
        styleIcon={{width: 30, height: 30}}
        onPress={pressSendMessage}
      />
      <CustomButton />
    </View>
  );
};
const styles = StyleSheet.create({
  styleChatBar: {
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default ComponentChatBarBottom;
