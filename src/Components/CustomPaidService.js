import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {icons} from '../Constants';
import CustomButton from './CustomButton';

const CustomPaidService = props => {
  const widthImage = Dimensions.get('window').width / 2 - 15;
  const {label, value, onPress} = props;
  return (
    <View style={[styles.container, {width: widthImage}]}>
      <Image
        style={[styles.icon]}
        resizeMode={'contain'}
        source={icons.ic_service}
      />
      <View style={{marginLeft: 5}}>
        <Text
          style={[
            styles.text,
            {color: 'rgba(127, 138, 147, 1)', fontWeight: '600'},
          ]}>
          {label}
        </Text>
        <Text
          style={[
            styles.text,
            {color: 'rgba(100, 92, 187, 1)', fontWeight: '400'},
          ]}>
          {value}
        </Text>
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
  icon: {width: 24, height: 24},
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
