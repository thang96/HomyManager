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

const CustomAppBarFloorInfor = props => {
  const {onPressLeft, pressIconRight, hauseName, address} = props;
  return (
    <ImageBackground source={images.im_appBar} style={{paddingHorizontal: 10}}>
      <View style={styles.viewAppBarTop}>
        <CustomButton
          styleIcon={styles.iconTop}
          icon={icons.ic_back}
          onPress={onPressLeft}
        />
        <Text style={styles.titleScreen}>Thông tin tầng</Text>
        <CustomButton
          styleIcon={styles.iconTop}
          icon={icons.ic_bell}
          onPress={pressIconRight}
        />
        <CustomButton styleIcon={styles.iconTop} icon={icons.ic_moreOption} />
      </View>
      <View style={styles.line} />
      <View style={{height: 130}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 26, color: 'white', flex: 1}}>
            {hauseName}
          </Text>
          <CustomButton
            styleButton={[
              {backgroundColor: colors.backgroundOrange},
              styles.styleButton,
            ]}
            icon={icons.ic_edit}
            styleIcon={styles.icon}
            label={'Chỉnh sửa'}
            styleLabel={{color: 'white', fontSize: 12}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 5}}>
            <Location width={32} height={32} />
          </View>
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={{color: 'white', fontSize: 11}}>{address}</Text>
          </View>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <CustomButton
            label={'Thêm phòng nhanh'}
            icon={icons.ic_plus}
            styleButton={[
              {backgroundColor: colors.backgroundOrange, marginRight: 10},
              styles.styleButton,
            ]}
            styleIcon={styles.icon}
            styleLabel={{color: 'white', fontSize: 12}}
          />
          <CustomButton
            label={'Sửa'}
            icon={icons.ic_plus}
            styleButton={[{backgroundColor: colors.green}, styles.styleButton]}
            styleIcon={styles.icon}
            styleLabel={{color: 'white', fontSize: 12}}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  line: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    height: 1,
    position: 'absolute',
    top: 56,
  },
  styleButton: {
    flexDirection: 'row',
    height: 26,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  icon: {tintColor: 'white', width: 18, height: 18, marginRight: 2},
  iconTop: {width: 24, height: 24, tintColor: 'white', marginRight: 10},
  titleScreen: {color: 'white', flex: 1, fontWeight: '600', fontSize: 17},
  viewAppBarTop: {height: 56, alignItems: 'center', flexDirection: 'row'},
});
export default CustomAppBarFloorInfor;
