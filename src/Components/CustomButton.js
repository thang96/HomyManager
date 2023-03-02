import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {icons} from '../Constants';
const CustomButton = props => {
  const {
    styleButton,
    icon,
    styleIcon,
    label,
    styleLabel,
    onPress,
    disabled,
    svgIcon,
    widthSvg,
    heightSvg,
  } = props;
  const IconItem = svgIcon;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styleButton, styles.button]}
      onPress={onPress}>
      {svgIcon && <IconItem width={widthSvg} height={heightSvg} />}
      {icon && <Image source={icon} style={styleIcon} resizeMode={'contain'} />}
      {label && <Text style={styleLabel}>{label}</Text>}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {justifyContent: 'center', alignItems: 'center'},
});
export default CustomButton;
