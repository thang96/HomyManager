import React from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';

const CustomRenderItem = props => {
  const {viewStyle, icon, label, value} = props;
  const widthWindow = Dimensions.get('window').width / 2 - 15;
  return (
    <View style={[styles.viewContainer, viewStyle, {width: widthWindow}]}>
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
    </View>
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
export default CustomRenderItem;
