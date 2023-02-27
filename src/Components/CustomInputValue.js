import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const CustomInputValue = props => {
  const {
    type,
    label,
    unit,
    placeholder,
    keyboardType,
    important,
    viewContainer,
    value,
  } = props;
  return (
    <View style={viewContainer}>
      <View
        style={{flexDirection: 'row', marginBottom: 3, alignItems: 'center'}}>
        <Text style={styles.label}>{label}</Text>
        {important && <Text style={{color: 'red'}}> *</Text>}
      </View>
      {type == 'input' && (
        <View style={styles.viewContainer}>
          <TextInput
            style={{flex: 1}}
            placeholder={placeholder}
            keyboardType={keyboardType}
          />
          <View style={styles.viewUnit}>
            <Text style={styles.textUnit}>{unit}</Text>
          </View>
        </View>
      )}
      {type == 'button' && (
        <TouchableOpacity
          style={[styles.viewContainer, {justifyContent: 'space-between'}]}>
          <Text style={styles.textUnit}>{value}</Text>
          <View style={styles.viewUnit}>
            <Text style={styles.textUnit}>{unit}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  label: {fontSize: 15, color: '#374047'},
  viewContainer: {
    height: 48,
    flexDirection: 'row',
    backgroundColor: '#f8f9f9',
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#dadee0',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  viewUnit: {
    height: 32,
    paddingHorizontal: 5,
    backgroundColor: '#ebedee',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textUnit: {borderRadius: 5, color: '#374047', fontSize: 13},
});
export default CustomInputValue;
