import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const CustomFeeOfInvoice = props => {
  const {} = props;
  return (
    <View style={styles.container}>
      <View style={styles.viewBetween}>
        <Text>Điện</Text>
        <Text>4000</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {height: 74, width: '100%'},
  viewBetween: {flexDirection: 'row', alignItems: 'center'},
});
export default CustomFeeOfInvoice;
