import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, icons} from '../Constants';

const CustomButtonValue = props => {
  const {title, important, placeholder, value, type, icon} = props;
  return (
    <View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
        {title && <Text style={styles.label}>{title}</Text>}
        {important && <Text style={{color: 'red', fontSize: 14}}> *</Text>}
      </View>
      {type == 'button' && (
        <TouchableOpacity style={styles.button}>
          <Text>{placeholder}</Text>
          <View style={styles.viewRow}>
            <View style={styles.backgroundValue}>
              <Text style={{fontSize: 13, color: '#374047'}}>{value}</Text>
            </View>
            {icon && (
              <Image
                source={icon}
                style={{width: 20, height: 20, marginLeft: 10}}
              />
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  label: {fontSize: 14, color: '#374047'},
  button: {
    height: 48,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.borderInput,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  backgroundValue: {
    backgroundColor: '#ebedee',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
});
export default CustomButtonValue;
