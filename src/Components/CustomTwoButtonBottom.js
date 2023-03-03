import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors, icons} from '../Constants';
import CustomButton from './CustomButton';

const CustomTwoButtonBottom = props => {
  const {styleView, leftLabel, rightLabel, onPressLeft, onPressRight} = props;
  return (
    <View style={[styles.container, styleView]}>
      <CustomButton
        label={leftLabel}
        styleButton={[styles.styleButton, styles.styleLeftButton]}
        styleLabel={styles.styleLeftLabel}
        onPress={onPressLeft}
      />
      <CustomButton
        label={rightLabel}
        styleButton={[styles.styleButton, styles.styleRightButton]}
        styleLabel={styles.styleRightLabel}
        onPress={onPressRight}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  styleButton: {
    borderWidth: 3,
    height: 44,
    flex: 1,
    borderRadius: 10,
  },
  styleLeftButton: {
    borderColor: colors.mainColor,
    backgroundColor: 'white',
    marginRight: 5,
  },
  styleRightButton: {
    borderColor: colors.mainColor,
    backgroundColor: colors.mainColor,
    marginLeft: 5,
  },
  styleLeftLabel: {color: colors.mainColor, fontSize: 15},
  styleRightLabel: {color: 'white', fontSize: 15},
});
export default CustomTwoButtonBottom;
