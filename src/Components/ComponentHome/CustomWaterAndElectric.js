import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CustomWaterAndElectric = props => {
  const {styleView, title, label, value, unit} = props;
  return (
    <View style={[styles.viewBackground, styleView]}>
      <View style={styles.viewRow}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={[
            styles.label,
            {
              color:
                label == 'Khách'
                  ? '#FE7A37'
                  : label == 'Quản lý'
                  ? '#0191FF'
                  : label == 'Lệch'
                  ? '#FF1E1E'
                  : 'grey',
            },
          ]}>
          {label}
        </Text>
      </View>
      <View style={styles.viewRow}>
        <Text style={styles.value}>{`${value}`}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewBackground: {
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 60,
    paddingHorizontal: 5,
  },
  viewRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  title: {fontSize: 13, color: 'rgba(151, 161, 167, 1)'},
  value: {
    color: 'rgba(55, 64, 71, 1)',
    fontSize: 14,
    fontWeight: '600',
  },
  unit: {color: 'rgba(95, 110, 120, 1)', fontSize: 13},
  label: {fontSize: 13},
});
export default CustomWaterAndElectric;
