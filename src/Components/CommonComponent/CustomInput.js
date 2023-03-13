import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import {colors, icons} from '../../Constants';
import CustomInputText from '../CustomTextInput';

const CustomInput = props => {
  const {
    important,
    type,
    styleViewInput,
    title,
    placeholder,
    keyboardType,
    value,
    onChangeText,
    onPress,
    styleButton,
    onEndEditing,
    defaultValue,
  } = props;
  return (
    <View style={styleViewInput}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 3}}>
        <Text style={styles.label}>{title}</Text>
        {important && <Text style={{color: 'red', fontSize: 14}}> *</Text>}
      </View>
      {type == 'input' && (
        <CustomInputText
          keyboardType={keyboardType}
          styleViewTextInput={styles.viewInput}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          onEndEditing={onEndEditing}
          defaultValue={defaultValue}
        />
      )}
      {type == 'button' && (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.viewButton, {paddingHorizontal: 10}, styleButton]}>
          <Text style={{color: value ? 'black' : 'grey'}}>
            {value ? value : placeholder}
          </Text>
          <Image
            source={icons.ic_down}
            resizeMode={'contain'}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  label: {fontSize: 15, color: '#374047'},
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    borderColor: '#ACB4B9',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderColor: '#dadee0',
  },
  viewInput: {
    borderWidth: 1,
    borderColor: '#ACB4B9',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    height: 50,
  },
  icon: {width: 20, height: 20},
});
export default CustomInput;
