import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const component = props => {
  return (
    <View style={styles.container}>
      <Text>component</Text>
    </View>
  );
};
const styles = StyleSheet.create({container: {flex: 1}});
export default component;
