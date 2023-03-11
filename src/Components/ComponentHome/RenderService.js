import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const RenderService = props => {
  const {viewStyle, icon, label, value, onPress} = props;
  const widthWindow = Dimensions.get('window').width / 2 - 15;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.viewContainer, viewStyle, {width: widthWindow}]}>
      {icon && <Image source={icon} style={styles.icon} />}
      <View>
        {label && (
          <Text style={{fontSize: 13, fontWeight: '600', color: '#374047'}}>
            {label}
          </Text>
        )}
        {value && (
          <Text style={{fontSize: 13, color: '#0191FF'}}>{`${value}`}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    height: 52,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 2.5,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {width: 30, height: 30, marginHorizontal: 5},
});
export default RenderService;
