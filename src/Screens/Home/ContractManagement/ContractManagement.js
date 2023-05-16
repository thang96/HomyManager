import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
} from 'react-native';
import {icons, colors} from '../../../Constants';
import CustomButton from '../../../Components/CommonComponent/CustomButton';
import CustomSearchAppBar from '../../../Components/CommonComponent/CustomSearchAppBar';
import CustomButtonBottom from '../../../Components/CommonComponent/CustomButtonBottom';
import {useDispatch, useSelector} from 'react-redux';
import {statusState, updateStatus} from '../../../Store/slices/statusSlice';
import useKeyboard from '../../../Hook/useKeyboard';
import {
  DeleteContractAPi,
  GetListContractsApi,
  LiquidationContractApi,
} from '../../../Api/Home/ContractApis/ContractApis';
import {token} from '../../../Store/slices/tokenSlice';
import CustomLoading from '../../../Components/CommonComponent/CustomLoading';
import CustomModalNotify from '../../../Components/CommonComponent/CustomModalNotify';
import RenderContract from '../../../Components/ComponentHome/RenderContract';
import CustomTextTitle from '../../../Components/CommonComponent/CustomTextTitle';
import {convertDate} from '../../../utils/common';

const ContractManagement = props => {
  const navigation = useNavigation();
  const keyboard = useKeyboard();
  const [textSearch, setTextSearch] = useState('');
  const tokenStore = useSelector(token);
  const [isActive, setIsActive] = useState(1);
  const dispatch = useDispatch();
  const statusLoading = useSelector(statusState);
  const [listContractActive, setListContractActive] = useState([]);
  const [listContractOutOfDate, setListContractOutOfDate] = useState([]);
  const [listContractLiquidation, setListContractLiquidation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalDeleteContract, setModalDeleteContract] = useState(false);
  const [modalLiquidationContract, setModalLiquidationContract] =
    useState(false);
  const [selectContract, setSelectContract] = useState();

  useEffect(() => {
    const getListData = async () => {
      await GetListContractsApi(tokenStore)
        .then(res => {
          if (res?.status == 200) {
            let response = res?.data;
            let active = [];
            let outOfDate = [];
            let liquidation = [];
            for (let index = 0; index < response.length; index++) {
              const element = response[index];
              if (element?.status == 0) {
                active.push(element);
              } else if (element?.status == 2) {
                outOfDate.push(element);
              } else if (element?.status == 3) {
                liquidation.push(element);
              }
            }
            setListContractActive(active);
            setListContractOutOfDate(outOfDate);
            setListContractLiquidation(liquidation);
            setLoading(false);
          }
        })
        .catch(error => console.log(error));
    };
    getListData();
  }, [statusLoading]);

  const liquidationContract = async () => {
    setModalLiquidationContract(false);
    setLoading(true);
    await LiquidationContractApi(tokenStore, selectContract?.id)
      .then(res => {
        if (res?.status == 200) {
          dispatch(updateStatus(`liquidation${selectContract?.id}`));
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteContract = async () => {
    setModalDeleteContract(false);
    setLoading(true);
    await DeleteContractAPi(tokenStore, selectContract?.id)
      .then(res => {
        if (res?.status == 200) {
          dispatch(updateStatus(`deleteContract${selectContract?.id}`));
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundGrey}}>
      {modalLiquidationContract && (
        <CustomModalNotify
          modalVisible={modalLiquidationContract}
          title={'Thanh lý hợp đồng'}
          label={'Bạn có muốn thanh lý hợp đồng này ?'}
          onRequestClose={() => setModalLiquidationContract(false)}
          pressConfirm={() => liquidationContract()}
        />
      )}
      {modalDeleteContract && (
        <CustomModalNotify
          modalVisible={modalDeleteContract}
          title={'Xóa hợp đồng'}
          label={'Bạn có muốn xóa hợp đồng này ?'}
          onRequestClose={() => setModalDeleteContract(false)}
          pressConfirm={() => deleteContract()}
        />
      )}
      {loading && <CustomLoading />}
      <CustomSearchAppBar
        iconLeft={icons.ic_back}
        label={'Quản lý hợp đồng'}
        // iconRight={icons.ic_bell}
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
          <View style={styles.container}>
            <CustomTextTitle label={'Hợp đồng đang hoạt động'} />
            <FlatList
              data={listContractActive}
              keyExtractor={key => key.id}
              renderItem={({item, index}) => {
                return (
                  <RenderContract
                    status={item?.status}
                    description={item?.description}
                    startDate={`${convertDate(item?.startDate)}`}
                    endDate={`${convertDate(item?.endDate)}`}
                    houseName={`${item?.unit?.house?.name}`}
                    unitName={`${item?.unit?.name}`}
                    contractOwner={`${item?.contractOwner?.fullName}`}
                    onPress={() =>
                      navigation.navigate('ContractDetail', item?.id)
                    }
                    pressEdit={() =>
                      navigation.navigate('EditContract', item?.id)
                    }
                    pressLiquidation={() => {
                      setSelectContract(item);
                      setModalLiquidationContract(true);
                    }}
                    pressDelete={() => {
                      setSelectContract(item);
                      setModalDeleteContract(true);
                    }}
                  />
                );
              }}
            />
          </View>
        ) : isActive == 2 ? (
          <View style={styles.container}>
            <CustomTextTitle label={'Hợp đồng quá hạn'} />
            <FlatList
              data={listContractOutOfDate}
              keyExtractor={key => key.id}
              renderItem={({item, index}) => {
                return (
                  <RenderContract
                    status={item?.status}
                    description={item?.description}
                    startDate={`${convertDate(item?.startDate)}`}
                    endDate={`${convertDate(item?.endDate)}`}
                    houseName={`${item?.unit?.house?.name}`}
                    unitName={`${item?.unit?.name}`}
                    contractOwner={`${item?.contractOwner?.fullName}`}
                    onPress={() =>
                      navigation.navigate('ContractDetail', item?.id)
                    }
                    pressEdit={() =>
                      navigation.navigate('EditContract', item?.id)
                    }
                    pressLiquidation={() => {
                      setSelectContract(item);
                      setModalLiquidationContract(true);
                    }}
                    pressDelete={() => {
                      setSelectContract(item);
                      setModalDeleteContract(true);
                    }}
                  />
                );
              }}
            />
          </View>
        ) : isActive == 3 ? (
          <View style={styles.container}>
            <CustomTextTitle label={'Hợp đồng đã thanh lý'} />
            <FlatList
              data={listContractLiquidation}
              keyExtractor={key => key.id}
              renderItem={({item, index}) => {
                return (
                  <RenderContract
                    status={item?.status}
                    description={item?.description}
                    startDate={`${convertDate(item?.startDate)}`}
                    endDate={`${convertDate(item?.endDate)}`}
                    houseName={`${item?.unit?.house?.name}`}
                    unitName={`${item?.unit?.name}`}
                    contractOwner={`${item?.contractOwner?.fullName}`}
                    onPress={() =>
                      navigation.navigate('ContractDetail', item?.id)
                    }
                    pressEdit={() =>
                      navigation.navigate('EditContract', item?.id)
                    }
                    pressLiquidation={() => {
                      setSelectContract(item);
                      setModalLiquidationContract(true);
                    }}
                    pressDelete={() => {
                      setSelectContract(item);
                      setModalDeleteContract(true);
                    }}
                  />
                );
              }}
            />
          </View>
        ) : null}
        <CustomButtonBottom
          label={'Thêm hợp đồng'}
          onPress={() => {
            dispatch(updateStatus(false));
            navigation.navigate('CreateContract');
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundGrey},
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
