import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ChatScreen = props => {
  return (
    <View style={styles.container}>
      <Text>ChatScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});
export default ChatScreen;
