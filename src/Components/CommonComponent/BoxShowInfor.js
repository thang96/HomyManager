import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const BoxShowInfor = props => {
  const {label, content, styleBox} = props;
  return (
    <View style={[styles.container, styleBox]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  shadowView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 1,
  },
  label: {fontSize: 12, color: 'rgba(151, 161, 167, 1)'},
  content: {color: 'rgba(55, 64, 71, 1)', fontWeight: '600'},
});
export default BoxShowInfor;
