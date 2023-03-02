import React, {useEffect, useState} from 'react';
import {StyleSheet, Keyboard, View} from 'react-native';
import {colors, icons, images, svgs} from '../../Constants';
import LogoApp from '../../Assets/Svgs/LogoApp.svg';
import {useNavigation} from '@react-navigation/native';
import CustomSearchAppBar from '../../Components/CustomSearchAppBar';

const WorkScreen = () => {
  const navigation = useNavigation();
  const [keyboard, setKeyboard] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);
  let avatar =
    'https://i.natgeofe.com/k/63b1a8a7-0081-493e-8b53-81d01261ab5d/red-panda-full-body_4x3.jpg';

  return (
    <View style={styles.container}>
      <CustomSearchAppBar
        svgLeft={LogoApp}
        label={'Công việc'}
        iconRight={icons.ic_bell}
        iconRightTextInput={icons.ic_option}
        iconSecondRight={avatar}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {backgroundColor: colors.backgroundGrey, flex: 1},
});
export default WorkScreen;
