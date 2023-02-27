import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {colors, icons} from '../Constants';

const CustomTimeButtons = props => {
  const {
    styleContainer,
    styleButtonLeft,
    styleButtonRight,
    title,
    leftLabel,
    rightLabel,
    valueLeft,
    valueRight,
    onPressLeft,
    onPressRightt,
  } = props;
  return (
    <View style={styleContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.label}>{title}</Text>
        <Text style={{color: 'red', fontSize: 14}}> *</Text>
      </View>
      <View style={[styles.viewRow, {marginTop: 5}]}>
        {leftLabel && (
          <TouchableOpacity
            style={[styles.viewButton, styleButtonLeft]}
            onPress={onPressLeft}>
            <Text style={styles.label}>{leftLabel}</Text>
            <View style={styles.backgroundValue}>
              <Text style={styles.time}>{`${valueLeft}`}</Text>
            </View>
          </TouchableOpacity>
        )}
        {rightLabel && (
          <TouchableOpacity
            style={[styles.viewButton, styleButtonRight]}
            onPress={onPressRightt}>
            <Text style={styles.label}>{rightLabel}</Text>
            <View style={styles.backgroundValue}>
              <Text style={styles.time}>{`${valueRight}`}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {fontSize: 15, color: '#374047'},
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: '#dadee0',
    paddingHorizontal: 5,
    backgroundColor: colors.backgroundButtonGrey,
  },
  time: {
    borderRadius: 5,
    color: '#5c6469',
    fontSize: 14,
  },
  backgroundValue: {
    backgroundColor: '#ebedee',
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderRadius: 4,
  },
});
export default CustomTimeButtons;
