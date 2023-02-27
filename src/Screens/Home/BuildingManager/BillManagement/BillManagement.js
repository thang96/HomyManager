import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  Text,
  ScrollView,
} from 'react-native';
import {icons, colors} from '../../../../Constants';
// import {ScrollView} from 'react-native-virtualized-view';
import CustomButton from '../../../../Components/CustomButton';
import CustomButtonBottom from '../../../../Components/CustomButtonBottom';
import CustomSearchAppBar from '../../../../Components/CustomSearchAppBar';

const BillManagement = props => {
  const navigation = useNavigation();
  const [keyboard, setKeyboard] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [isActive, setIsActive] = useState(1);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomSearchAppBar
          iconLeft={icons.ic_back}
          label={'Quản lý hóa đơn'}
          iconRight={icons.ic_bell}
          iconSecondRight={icons.ic_moreOption}
          pressIconLeft={() => navigation.goBack()}
          keyboard={keyboard}
          textSearch={textSearch}
          value={textSearch}
          onChangeText={text => setTextSearch(text)}
          placeholder={'Tìm kiếm...'}
        />
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <ScrollView style={[styles.eachContainer]}>
            <ScrollView horizontal style={{height: 45}}>
              <CustomButton
                label={'Chưa tạo'}
                styleLabel={[
                  styles.labelTop,
                  {color: isActive == 1 ? colors.backgroundButton : 'grey'},
                ]}
                styleButton={[
                  styles.topButton,
                  {
                    borderBottomColor:
                      isActive == 1
                        ? colors.backgroundButton
                        : colors.backgroundGrey,
                  },
                ]}
                onPress={() => setIsActive(1)}
              />
              <CustomButton
                label={'Chưa thanh toán'}
                styleLabel={[
                  styles.labelTop,
                  {color: isActive == 2 ? colors.backgroundButton : 'grey'},
                ]}
                styleButton={[
                  styles.topButton,
                  {
                    borderBottomColor:
                      isActive == 2
                        ? colors.backgroundButton
                        : colors.backgroundGrey,
                  },
                ]}
                onPress={() => setIsActive(2)}
              />
              <CustomButton
                label={'Quá hạn'}
                styleLabel={[
                  styles.labelTop,
                  {color: isActive == 3 ? colors.backgroundButton : 'grey'},
                ]}
                styleButton={[
                  styles.topButton,
                  {
                    borderBottomColor:
                      isActive == 3
                        ? colors.backgroundButton
                        : colors.backgroundGrey,
                  },
                ]}
                onPress={() => setIsActive(3)}
              />
              <CustomButton
                label={'Đã thanh toán'}
                styleLabel={[
                  styles.labelTop,
                  {color: isActive == 4 ? colors.backgroundButton : 'grey'},
                ]}
                styleButton={[
                  styles.topButton,
                  {
                    borderBottomColor:
                      isActive == 4
                        ? colors.backgroundButton
                        : colors.backgroundGrey,
                  },
                ]}
                onPress={() => setIsActive(4)}
              />
            </ScrollView>
          </ScrollView>
          <CustomButtonBottom
            label={'Thêm dịch vụ mới'}
            onPress={() => navigation.navigate('AddService')}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.backgroundGrey,
  },
  styleLabel: {color: 'white', fontWeight: '500', marginLeft: 5},
  topButton: {marginRight: 15, borderBottomWidth: 3},
  labelTop: {color: colors.backgroundButton, fontWeight: 'bold', fontSize: 16},
});
export default BillManagement;
