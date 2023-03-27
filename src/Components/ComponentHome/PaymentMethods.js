import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
const PaymentMethods = props => {
  const {icon, title, describe} = props;
  return (
    <View style={[styles.container, styles.viewShadow]}>
      <Image
        source={typeof icon == 'string' ? {uri: icon} : null}
        style={{width: 80, height: 32, marginHorizontal: 10}}
      />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.label}>{describe}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 62,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewShadow: {
    margin: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  title: {color: '#374047', fontWeight: '600', fontSize: 13},
  label: {color: '#5F6E78', fontWeight: '400', fontSize: 12},
});
export default PaymentMethods;
