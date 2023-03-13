import React from 'react';
import {StyleSheet, View, Image, TextInput} from 'react-native';
import {icons} from '../Constants';
import CustomButton from './CommonComponent/CustomButton';
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
    defaultValue,
    onEndEditing,
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
        style={[{flex: 1, color: 'black'}, styleTextinput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        defaultValue={defaultValue}
        onEndEditing={onEndEditing}
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
