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

const CustomPaidService = props => {
  const widthImage = Dimensions.get('window').width / 2 - 15;
  const {label, value, icon} = props;
  return (
    <View style={[styles.container, {width: widthImage}]}>
      <Image
        style={[styles.icon]}
        resizeMode={'contain'}
        source={
          typeof icon == 'string' && icon != ''
            ? {uri: `${icon}`}
            : icons.ic_service
        }
      />
      <View style={{marginLeft: 5}}>
        <Text style={[styles.text, {color: '#374047', fontWeight: '600'}]}>
          {label}
        </Text>
        <Text
          style={[styles.text, {color: colors.mainColor, fontWeight: '400'}]}>
          {value}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: 'white',
    elevation: 1,
    zIndex: 1,
    padding: 2,
    borderRadius: 5,
    paddingHorizontal: 8,
    margin: 2.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  icon: {width: 24, height: 24, marginRight: 5},
  styleIcon: {width: 15, height: 15, tintColor: '#000000'},
  styleButton: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  text: {fontSize: 13},
});
export default CustomPaidService;
