import {useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {colors, icons} from '../Constants';
import CustomButton from './CommonComponent/CustomButton';

const CustomAppBarChatScreen = props => {
  const {
    iconLeft,
    name,
    iconRight,
    iconSecondRight,
    pressIconLeft,
    pressIconRight,
    pressSeccodIconRight,
    avatar,
  } = props;
  const route = useRoute();
  return (
    <View style={styles.styleAppBar}>
      {iconLeft && (
        <CustomButton
          styleButton={styles.styleButton}
          icon={iconLeft}
          styleIcon={styles.icon}
          onPress={pressIconLeft}
        />
      )}
      <Image
        source={typeof avatar == 'string' ? {uri: avatar} : icons.ic_user}
        style={{height: 40, width: 40, borderRadius: 40, marginHorizontal: 10}}
      />
      <View style={{flex: 1}}>
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
          }}>{`${route.params?.name}`}</Text>
        <Text style={{color: 'white', fontSize: 11}}>
          {route.params?.status ? 'Online' : 'Offline'}
        </Text>
      </View>
      {iconRight && (
        <CustomButton
          styleButton={[{marginRight: 15}]}
          icon={iconRight}
          styleIcon={styles.icon}
          onPress={pressIconRight}
        />
      )}
      {iconSecondRight && (
        <CustomButton
          styleButton={[{marginRight: 15}]}
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
export default CustomAppBarChatScreen;
