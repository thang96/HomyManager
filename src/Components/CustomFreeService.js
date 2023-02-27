import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {colors, icons} from '../Constants';
import CustomButton from './CustomButton';

const CustomFreeService = props => {
  const widthImage = Dimensions.get('window').width / 3 - 10;
  const {label, value, onPress} = props;
  return (
    <View style={[styles.container, {width: widthImage}]}>
      <View style={{flex: 1}}>
        <Text style={[styles.text]}>{label}</Text>
      </View>
      <CustomButton
        icon={icons.ic_close}
        styleIcon={styles.styleIcon}
        styleButton={styles.styleButton}
        onPress={onPress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 38,
    backgroundColor: colors.mainColor,
    elevation: 1,
    zIndex: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    margin: 2,
  },
  styleIcon: {width: 12, height: 12, tintColor: 'white', marginLeft: 3},
  text: {fontSize: 13, fontWeight: '400', color: 'white'},
});
export default CustomFreeService;
