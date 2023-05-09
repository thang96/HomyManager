import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors, icons, images} from '../../Constants';
import CustomButton from './CustomButton';
import Location from '../../Assets/Svgs/Location.svg';
const widthLine = Dimensions.get('window').width - 20;

const CustomAppBarBuildingInfor = props => {
  const {onPressLeft, nameBuilding, addressBuilding, pressIconRight} = props;
  return (
    <ImageBackground source={images.im_appBar} style={{paddingHorizontal: 10}}>
      <View style={styles.viewTabBarTop}>
        <CustomButton
          styleIcon={styles.iconTop}
          icon={icons.ic_back}
          onPress={onPressLeft}
        />
        <Text style={{color: 'white', flex: 1}}>Thông tin tòa nhà</Text>
        <CustomButton
          styleIcon={styles.iconTop}
          icon={icons.ic_bell}
          onPress={pressIconRight}
        />
        <CustomButton styleIcon={styles.iconTop} icon={icons.ic_moreOption} />
      </View>
      <View style={styles.whiteLine} />
      <View style={{height: 130, paddingVertical: 5}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{fontSize: 20, fontWeight: '600', color: 'white', flex: 1}}>
            {nameBuilding}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{marginTop: 5}}>
            <Location width={32} height={32} />
          </View>
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={{color: 'white', fontSize: 10}}>
              {addressBuilding}
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  viewTabBarTop: {height: 56, alignItems: 'center', flexDirection: 'row'},
  iconTop: {width: 24, height: 24, tintColor: 'white', marginRight: 10},
  whiteLine: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    height: 1,
    position: 'absolute',
    top: 56,
  },
});
export default CustomAppBarBuildingInfor;
