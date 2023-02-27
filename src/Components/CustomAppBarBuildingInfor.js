import React from 'react';
import {Dimensions, ImageBackground, Text, View} from 'react-native';
import {colors, icons, images} from '../Constants';
import CustomButton from './CustomButton';
import Location from '../Assets/Svgs/Location.svg';
const widthLine = Dimensions.get('window').width - 20;

const CustomAppBarBuildingInfor = props => {
  const {onPressLeft} = props;
  return (
    <ImageBackground source={images.im_appBar} style={{paddingHorizontal: 10}}>
      <View
        style={{
          height: 56,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <CustomButton
          styleIcon={{
            width: 24,
            height: 24,
            tintColor: 'white',
            marginRight: 10,
          }}
          icon={icons.ic_back}
          onPress={onPressLeft}
        />
        <Text style={{color: 'white', flex: 1}}>Thông tin tòa nhà</Text>
        <CustomButton
          styleIcon={{
            width: 24,
            height: 24,
            tintColor: 'white',
            marginRight: 10,
          }}
          icon={icons.ic_bell}
        />
        <CustomButton
          styleIcon={{
            width: 24,
            height: 24,
            tintColor: 'white',
            marginRight: 10,
          }}
          icon={icons.ic_moreOption}
        />
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          alignSelf: 'center',
          height: 1,
          position: 'absolute',
          top: 56,
        }}
      />
      <View style={{height: 130}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 26, color: 'white', flex: 1}}>
            Tòa nhà D1
          </Text>
          <CustomButton
            styleButton={{
              flexDirection: 'row',
              height: 26,
              backgroundColor: colors.backgroundOrange,
              paddingHorizontal: 3,
              borderRadius: 5,
            }}
            icon={icons.ic_edit}
            styleIcon={{tintColor: 'white', width: 18, height: 18}}
            label={'Chỉnh sửa'}
            styleLabel={{color: 'white', fontSize: 12}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 5}}>
            <Location width={32} height={32} />
          </View>
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={{color: 'white', fontSize: 11}}>
              448 Lê Văn Việt, Tăng Nhơn Phú A, TP.Thủ Đức
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default CustomAppBarBuildingInfor;
