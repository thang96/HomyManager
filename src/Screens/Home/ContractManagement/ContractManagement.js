import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Keyboard} from 'react-native';
import {icons, colors} from '../../../Constants';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import CustomSearchAppBar from '../../../Components/CommonComponent/CustomSearchAppBar';
import CustomIsActive from './CustomIsActive';
import CustomOutOfDate from './CustomOutOfDate';
import CustomLiquidated from './CustomLiquidated';
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import {useDispatch} from 'react-redux';
import {updateStatus} from '../../../Store/slices/statusSlice';
import useKeyboard from '../../../Hook/useKeyboard';

const ContractManagement = props => {
  const navigation = useNavigation();
  const keyboard = useKeyboard();
  const [textSearch, setTextSearch] = useState('');
  const [isActive, setIsActive] = useState(1);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <CustomSearchAppBar
          iconLeft={icons.ic_back}
          label={'Quản lý hợp đồng'}
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
          <View style={styles.viewButtonTop}>
            <CustomButton
              styleButton={[
                {
                  backgroundColor:
                    isActive == 1 ? colors.backgroundOrange : 'white',
                },
                styles.viewButton,
              ]}
              label={'Hoạt động'}
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
              label={'Quá hạn'}
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
              label={'Đã thanh lý'}
              styleLabel={{color: isActive == 3 ? 'white' : '#7F8A93'}}
              onPress={() => setIsActive(3)}
            />
          </View>
          {isActive == 1 ? (
            <CustomIsActive />
          ) : isActive == 2 ? (
            <CustomOutOfDate />
          ) : isActive == 3 ? (
            <CustomLiquidated />
          ) : null}
          <CustomButtonBottom
            label={'Thêm hợp đồng'}
            onPress={() => {
              dispatch(updateStatus(false));
              navigation.navigate('CreateContract');
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  eachContainer: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
  },
  styleLabel: {color: 'white', fontWeight: '500', marginLeft: 5},
  topButton: {marginRight: 15, height: 44, borderBottomWidth: 3},
  labelTop: {fontWeight: 'bold', fontSize: 16},
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
  },
});
export default ContractManagement;
