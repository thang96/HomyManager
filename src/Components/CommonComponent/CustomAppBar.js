import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../Constants';
import CustomButton from '../CommonComponent/CustomButton';

const CustomAppBar = props => {
  const {
    iconLeft,
    label,
    iconRight,
    iconSecondRight,
    pressIconLeft,
    pressIconRight,
    pressSeccodIconRight,
    svgLeft,
    pressLogo,
  } = props;
  const ItemIcon = svgLeft;
  return (
    <View style={styles.styleAppBar}>
      {svgLeft && (
        <TouchableOpacity onPress={pressLogo}>
          <ItemIcon width={30} height={30} />
        </TouchableOpacity>
      )}
      {iconLeft && (
        <CustomButton
          styleButton={styles.styleButton}
          icon={iconLeft}
          styleIcon={styles.icon}
          onPress={pressIconLeft}
        />
      )}
      {label && <Text style={styles.label}>{label}</Text>}
      {iconRight && (
        <CustomButton
          styleButton={[{marginRight: 15}]}
          icon={iconRight}
          styleIcon={styles.icon}
          onPress={pressIconRight}
        />
      )}
      {typeof iconSecondRight == 'string' && iconSecondRight ? (
        <CustomButton
          icon={iconSecondRight}
          styleIcon={{width: 30, height: 30, borderRadius: 30}}
          onPress={pressSeccodIconRight}
        />
      ) : (
        <CustomButton
          icon={iconSecondRight}
          styleIcon={styles.icon}
          onPress={pressSeccodIconRight}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  styleAppBar: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mainColor,
    paddingHorizontal: 10,
  },
  icon: {width: 24, height: 24, tintColor: 'white'},
  label: {
    color: 'white',
    marginLeft: 8,
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'sf-pro-text-semibold',
    letterSpacing: -0.5,
  },
});
export default CustomAppBar;
