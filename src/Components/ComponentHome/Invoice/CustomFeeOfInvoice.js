import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
const CustomFeeOfInvoice = props => {
  const {title, unit, defaultValue} = props;
  return (
    <View style={[styles.container, styles.viewBetween]}>
      <Text style={{color: '#374047'}}>{title}</Text>
      <View style={styles.viewRow}>
        <TextInput defaultValue={defaultValue} />
        <Text style={{color: '#374047'}}>{unit}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  viewBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
});
export default CustomFeeOfInvoice;
