import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomButton from '../../../Components/CustomButton';
import CustomButtonBottom from '../../../Components/CustomButtonBottom';
import CustomSearchAppBar from '../../../Components/CustomSearchAppBar';
import CustomTextTitle from '../../../Components/CustomTextTitle';
import {colors, icons, images} from '../../../Constants';

const BuildingManager = () => {
  const navigation = useNavigation();
  const [keyboard, setKeyboard] = useState(null);
  const [textSearch, setTextSearch] = useState('');
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <CustomSearchAppBar
        iconLeft={icons.ic_back}
        label={'Quản lý tòa nhà'}
        iconRight={icons.ic_bell}
        iconSecondRight={icons.ic_circleFill}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
        pressIconLeft={() => navigation.goBack()}
      />

      <ScrollView style={{paddingHorizontal: 10}}>
        <CustomTextTitle label={'Tòa nhà hiện có'} />
        <CustomRenderBuilding
          image={images.im_frame1}
          name={'Tòa nhà D1'}
          address={'448 Lê Văn Việt, Tăng Nhơn Phú A, TP. Thủ Đức'}
          numberOfRoom={12}
          emptRoom={4}
          issue={2}
          onPress={() => navigation.navigate('BuildingInformation')}
        />
      </ScrollView>
      <CustomButtonBottom
        label={'Thêm tòa nhà mới'}
        onPress={() => navigation.navigate('AddBuildings')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
  },
});

const CustomRenderBuilding = props => {
  const {name, address, onPress, image} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styleRender.button}>
      <Image source={image} style={styleRender.image} />
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          paddingHorizontal: 10,
          justifyContent: 'space-between',
        }}>
        <View style={styleRender.viewRow}>
          <Text style={styleRender.name}>{name}</Text>
          <Image source={icons.ic_plus} style={styleRender.icon} />
        </View>
        <Text style={styleRender.address}>{address}</Text>
        <View style={[styleRender.viewRow]}>
          <CustomButton
            disabled={true}
            label={'12'}
            icon={icons.ic_home}
            styleIcon={styleRender.icon}
            styleButton={styleRender.styleButton}
          />
          <CustomButton
            disabled={true}
            label={'4'}
            icon={icons.ic_key}
            styleIcon={styleRender.icon}
            styleButton={styleRender.styleButton}
          />
          <CustomButton
            disabled={true}
            label={'2'}
            icon={icons.ic_exclamation}
            styleIcon={styleRender.icon}
            styleButton={styleRender.styleButton}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styleRender = StyleSheet.create({
  button: {
    flexDirection: 'row',
    flex: 1,
    height: 116,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    margin: 2,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 4,
    marginBottom: 20,
  },
  image: {width: 76, height: 92, borderRadius: 10},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {width: 18, height: 18, tintColor: 'black', marginRight: 5},
  name: {fontSize: 14, fontWeight: 'bold', color: 'black'},
  styleButton: {flexDirection: 'row', alignItems: 'center'},
  address: {fontSize: 9, color: 'grey'},
});
export default BuildingManager;
