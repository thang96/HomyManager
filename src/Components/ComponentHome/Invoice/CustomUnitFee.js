import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../../Constants';
const CustomUnitFee = props => {
  const {
    title,
    important,
    defaultValue,
    onEndEditing,
    placeholder,
    keyboardType,
  } = props;
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', width: 130}}>
        <Text style={styles.label}>{title}</Text>
        {important && <Text style={{color: 'red', fontSize: 14}}> *</Text>}
      </View>
      <View style={[styles.viewInput, styles.shadowView]}>
        <TextInput
          style={{flex: 1}}
          keyboardType={keyboardType}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onEndEditing={onEndEditing}
        />
        <View
          style={{backgroundColor: colors.backgroundInput, borderRadius: 4}}>
          <Text style={styles.textUnit}>{'VNĐ'}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 10,
  },
  shadowView: {
    margin: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewInput: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  textUnit: {color: '#5F6E78', marginHorizontal: 5, fontSize: 13},
});
export default CustomUnitFee;
