import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors} from '../Constants';
import CustomButton from './CustomButton';

const CustomAppBar = props => {
  const {
    iconLeft,
    label,
    iconRight,
    iconSecondRight,
    pressIconLeft,
    pressIconRight,
    pressSeccodIconRight,
  } = props;
  return (
    <View style={styles.styleAppBar}>
      {iconLeft && (
        <CustomButton
          styleButton={styles.styleButton}
          icon={iconLeft}
          styleIcon={styles.icon}
          onPress={pressIconLeft}
        />
      )}
      {label && <Text style={styles.label}>{label}</Text>}
      {iconRight && (
        <CustomButton
          styleButton={styles.styleButton}
          icon={iconRight}
          styleIcon={styles.icon}
          onPress={pressIconRight}
        />
      )}
      {iconSecondRight && (
        <CustomButton
          styleButton={styles.styleButton}
          icon={iconSecondRight}
          styleIcon={styles.icon}
          onPress={pressSeccodIconRight}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  styleAppBar: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mainColor,
  },
  icon: {width: 24, height: 24, tintColor: 'white'},
  label: {
    color: 'white',
    marginLeft: 8,
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'sf-pro-text-semibold',
    letterSpacing: -0.5,
  },
  styleButton: {width: 25, height: 56, marginHorizontal: 10},
});
export default CustomAppBar;
