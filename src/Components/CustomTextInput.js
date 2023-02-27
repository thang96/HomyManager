import React from 'react';
import {StyleSheet, View, Image, TextInput} from 'react-native';
import {icons} from '../Constants';
import CustomButton from './CustomButton';
const CustomInputText = props => {
  const {
    styleViewTextInput,
    styleTextinput,
    placeholder,
    value,
    secureTextEntry,
    onChangeText,
    numberOfLines,
    keyboardType,
    iconRight,
    styleIconRight,
    onPressIconRight,
    iconLeft,
    styleIconLeft,
    onPressIconLeft,
  } = props;
  return (
    <View style={[styleViewTextInput, styles.viewInput]}>
      {iconLeft && (
        <CustomButton
          icon={iconLeft}
          styleIcon={styleIconLeft}
          onPress={onPressIconLeft}
        />
      )}
      <TextInput
        numberOfLines={numberOfLines ? numberOfLines : 1}
        secureTextEntry={secureTextEntry}
        style={[{flex: 1}, styleTextinput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      {iconRight && (
        <CustomButton
          icon={iconRight}
          styleIcon={styleIconRight}
          onPress={onPressIconRight}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  viewInput: {flexDirection: 'row', alignItems: 'center'},
});
export default CustomInputText;
