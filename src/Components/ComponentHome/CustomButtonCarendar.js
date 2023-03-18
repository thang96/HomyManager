import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {colors} from '../../Constants';

const CustomButtonCarendar = props => {
  const {styleButton, label, value, icon, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, styleButton]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.viewRow}>
        <View style={styles.viewValue}>
          <Text style={styles.value}>{value}</Text>
        </View>
        <Image source={icon} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 49,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.borderInput,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  label: {color: '#7F8A93'},
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  icon: {width: 26, height: 26, marginLeft: 10},
  viewValue: {
    paddingHorizontal: 10,
    backgroundColor: '#DEE1E3',
    borderRadius: 4,
    paddingVertical: 3,
  },
  value: {fontSize: 13, color: '#374047'},
});
export default CustomButtonCarendar;
