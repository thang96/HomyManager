import React, {useEffect, useState} from 'react';
import {StyleSheet, Keyboard, View} from 'react-native';
import {colors, icons, images, svgs} from '../../Constants';
import LogoApp from '../../Assets/Svgs/LogoApp.svg';
import {useNavigation} from '@react-navigation/native';
import CustomSearchAppBar from '../../Components/CommonComponent/CustomSearchAppBar';
import CustomButton from '../../Components/CommonComponent/CustomButton';
import CustomContract from '../../Components/ComponentWork/CustomContract';
import CustomIssue from '../../Components/ComponentWork/CustomIssue';
import CustomBill from '../../Components/ComponentWork/CustomBill';

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

  const [isActive, setIsActive] = useState(1);

  let avatar =
    'https://i.natgeofe.com/k/63b1a8a7-0081-493e-8b53-81d01261ab5d/red-panda-full-body_4x3.jpg';

  return (
    <View style={styles.container}>
      <CustomSearchAppBar
        svgLeft={LogoApp}
        label={'Công việc'}
        iconRight={icons.ic_bell}
        pressIconRight={() => navigation.navigate('NotificationScreen')}
        iconRightTextInput={icons.ic_option}
        iconSecondRight={avatar}
        pressSeccodIconRight={() => navigation.navigate('StackAccountPage')}
        keyboard={keyboard}
        textSearch={textSearch}
        value={textSearch}
        onChangeText={text => setTextSearch(text)}
        placeholder={'Tìm kiếm...'}
      />
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <View style={styles.viewButtonTop}>
          <CustomButton
            styleButton={[
              {
                backgroundColor:
                  isActive == 1 ? colors.backgroundOrange : 'white',
              },
              styles.viewButton,
            ]}
            label={'Hợp đồng'}
            styleLabel={{color: isActive == 1 ? 'white' : '#7F8A93'}}
            onPress={() => setIsActive(1)}
          />
          <CustomButton
            styleButton={[
              {
                backgroundColor:
                  isActive == 2 ? colors.backgroundOrange : 'white',
              },
              styles.viewButton,
            ]}
            label={'Hóa đơn'}
            styleLabel={{color: isActive == 2 ? 'white' : '#7F8A93'}}
            onPress={() => setIsActive(2)}
          />
          <CustomButton
            styleButton={[
              {
                backgroundColor:
                  isActive == 3 ? colors.backgroundOrange : 'white',
              },
              styles.viewButton,
            ]}
            label={'Sự cố'}
            styleLabel={{color: isActive == 3 ? 'white' : '#7F8A93'}}
            onPress={() => setIsActive(3)}
          />
        </View>
        {isActive == 1 ? (
          <CustomContract />
        ) : isActive == 2 ? (
          <CustomBill />
        ) : isActive == 3 ? (
          <CustomIssue
            pressIssue={item => navigation.navigate('IssueInformation', item)}
          />
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {backgroundColor: colors.backgroundGrey, flex: 1},
  viewButtonTop: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    height: 42,
    borderRadius: 4,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    flex: 1,
  },
});
export default WorkScreen;
